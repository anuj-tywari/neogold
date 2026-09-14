const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const { User, UserDetails, Vendor } = require('../models');
const emailService = require('../services/emailService');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { email, password, phoneNumber, vendorCode } = req.body;
    
    // Validate input
    if (!email || !password) {
      throw new HttpError(400, 'Email and password are required');
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpError(400, 'Email already registered');
    }
    
    // Check if phone already exists (if provided)
    if (phoneNumber) {
      const existingPhone = await User.findOne({ where: { phoneNumber } });
      if (existingPhone) {
        throw new HttpError(400, 'Phone number already registered');
      }
    }
    
    // Check if vendor code is provided and valid
    let vendorId = null;
    if (vendorCode) {
      const vendor = await Vendor.findOne({ where: { code: vendorCode } });
      if (!vendor) {
        throw new HttpError(400, 'Invalid vendor code');
      }
      vendorId = vendor.id;
    }
    
    // Create user
    const user = await User.create({
      email,
      password,
      phoneNumber,
      role: 'USER',
      status: 'PENDING',
      vendorId
    });
    
    // Create user details
    await UserDetails.create({
      userId: user.id,
      vendorId
    });
    
    // Send verification email
    try {
      await emailService.sendVerificationEmail(user);
    } catch (error) {
      logger.error(`Failed to send verification email: ${error.message}`);
      // Continue registration process even if email fails
    }
    
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully. Please verify your email.',
      data: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT tokens
 * @access Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      throw new HttpError(400, 'Email and password are required');
    }
    
    // Find user
    const user = await User.findOne({ 
      where: { email },
      include: [
        { 
          model: UserDetails, 
          as: 'details',
          attributes: ['firstName', 'lastName', 'profilePicture'] 
        },
        {
          model: Vendor,
          as: 'vendor',
          attributes: ['id', 'name', 'code', 'logo']
        }
      ]
    });
    
    if (!user) {
      throw new HttpError(401, 'Invalid credentials');
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new HttpError(401, 'Invalid credentials');
    }
    
    // Check if user is active
    if (user.status !== 'ACTIVE') {
      throw new HttpError(401, 'Account is not active. Please verify your email or contact support.');
    }
    
    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    
    // Save refresh token
    await user.update({ refreshToken, lastLogin: new Date() });
    
    return res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
          firstName: user.details ? user.details.firstName : null,
          lastName: user.details ? user.details.lastName : null,
          profilePicture: user.details ? user.details.profilePicture : null,
          vendor: user.vendor ? {
            id: user.vendor.id,
            name: user.vendor.name,
            code: user.vendor.code,
            logo: user.vendor.logo
          } : null
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/logout
 * @desc Logout user and invalidate refresh token
 * @access Private
 */
const logoutUser = async (req, res, next) => {
  try {
    // Clear refresh token in database
    await req.user.update({ refreshToken: null });
    
    return res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/verify-email/:token
 * @desc Verify user email
 * @access Public
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    
    // Find email verification record
    const verification = await EmailVerification.findOne({
      where: {
        token,
        isUsed: false,
        expiresAt: { [Op.gt]: new Date() }
      }
    });
    
    if (!verification) {
      throw new HttpError(400, 'Invalid or expired verification token');
    }
    
    // Update user status
    const user = await User.findByPk(verification.userId);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }
    
    await user.update({ status: 'ACTIVE' });
    
    // Update user details
    await UserDetails.update(
      { emailVerified: true },
      { where: { userId: user.id } }
    );
    
    // Mark verification token as used
    await verification.update({ isUsed: true });
    
    return res.status(200).json({
      status: 'success',
      message: 'Email verified successfully. You can now log in.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/resend-verification
 * @desc Resend verification email
 * @access Public
 */
const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      throw new HttpError(400, 'Email is required');
    }
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpError(404, 'User not found');
    }
    
    // If already verified
    if (user.status === 'ACTIVE') {
      throw new HttpError(400, 'Email already verified');
    }
    
    // Send verification email
    await emailService.sendVerificationEmail(user);
    
    return res.status(200).json({
      status: 'success',
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/reset-password
 * @desc Request password reset
 * @access Public
 */
const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      throw new HttpError(400, 'Email is required');
    }
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // For security reasons, still return success even if user not found
      return res.status(200).json({
        status: 'success',
        message: 'If your email is registered, you will receive a password reset link'
      });
    }
    
    // Generate reset token
    const resetToken = await user.generatePasswordResetToken();
    
    // Send password reset email
    await emailService.sendPasswordResetEmail(user, resetToken);
    
    return res.status(200).json({
      status: 'success',
      message: 'If your email is registered, you will receive a password reset link'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/reset-password/:token
 * @desc Reset password using token
 * @access Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    
    if (!password) {
      throw new HttpError(400, 'New password is required');
    }
    
    // Find user with this reset token
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    });
    
    if (!user) {
      throw new HttpError(400, 'Invalid or expired reset token');
    }
    
    // Update password and clear reset token
    await user.update({
      password,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });
    
    return res.status(200).json({
      status: 'success',
      message: 'Password reset successfully. You can now log in with your new password.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/api-keys
 * @desc Generate API key and secret for authenticated user
 * @access Private
 */
const generateApiKey = async (req, res, next) => {
  try {
    // Only allow certain roles to generate API keys
    if (!['ADMIN', 'VENDOR_ADMIN'].includes(req.user.role)) {
      throw new HttpError(403, 'Insufficient permissions to generate API keys');
    }
    
    // Generate API credentials
    const credentials = await req.user.generateApiCredentials();
    
    return res.status(200).json({
      status: 'success',
      message: 'API key generated successfully. Please save your API secret as it will not be shown again.',
      data: credentials
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route DELETE /api/auth/api-keys
 * @desc Revoke API key for authenticated user
 * @access Private
 */
const revokeApiKey = async (req, res, next) => {
  try {
    // Revoke API key
    await req.user.update({
      apiKey: null,
      apiSecret: null,
      apiKeyEnabled: false
    });
    
    return res.status(200).json({
      status: 'success',
      message: 'API key revoked successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/vendor/register
 * @desc Register a new vendor
 * @access Private (Admin only)
 */
const registerVendor = async (req, res, next) => {
  try {
    // Only admins can register vendors
    if (req.user.role !== 'ADMIN') {
      throw new HttpError(403, 'Only admins can register vendors');
    }
    
    const { 
      name, code, email, phone, address, city, state, 
      country, postalCode, website, contactPersonName,
      contactPersonEmail, contactPersonPhone, adminEmail, adminPassword
    } = req.body;
    
    // Validate required fields
    if (!name || !code || !email || !phone || !adminEmail || !adminPassword) {
      throw new HttpError(400, 'Required fields missing');
    }
    
    // Check if vendor code already exists
    const existingVendor = await Vendor.findOne({ where: { code } });
    if (existingVendor) {
      throw new HttpError(400, 'Vendor code already exists');
    }
    
    // Check if vendor email already exists
    const existingVendorEmail = await Vendor.findOne({ where: { email } });
    if (existingVendorEmail) {
      throw new HttpError(400, 'Vendor email already exists');
    }
    
    // Check if admin email already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (existingAdmin) {
      throw new HttpError(400, 'Admin email already exists');
    }
    
    // Create vendor
    const vendor = await Vendor.create({
      name,
      code,
      email,
      phone,
      address,
      city,
      state,
      country: country || 'India',
      postalCode,
      website,
      contactPersonName,
      contactPersonEmail,
      contactPersonPhone,
      isActive: true
    });
    
    // Create vendor admin user
    const vendorAdmin = await User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'VENDOR_ADMIN',
      status: 'ACTIVE',
      vendorId: vendor.id
    });
    
    // Create vendor admin details
    await UserDetails.create({
      userId: vendorAdmin.id,
      firstName: contactPersonName ? contactPersonName.split(' ')[0] : null,
      lastName: contactPersonName ? contactPersonName.split(' ').slice(1).join(' ') : null,
      emailVerified: true,
      vendorId: vendor.id
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Vendor registered successfully',
      data: {
        vendor: {
          id: vendor.id,
          name: vendor.name,
          code: vendor.code
        },
        admin: {
          id: vendorAdmin.id,
          email: vendorAdmin.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/auth/vendor/staff
 * @desc Register a new vendor staff
 * @access Private (Vendor Admin only)
 */
const registerVendorStaff = async (req, res, next) => {
  try {
    // Only vendor admins can register staff
    if (req.user.role !== 'VENDOR_ADMIN') {
      throw new HttpError(403, 'Only vendor admins can register staff');
    }
    
    const { 
      email, password, firstName, lastName, phoneNumber, 
      permissions = {} 
    } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      throw new HttpError(400, 'Email and password are required');
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpError(400, 'Email already registered');
    }
    
    // Create staff user
    const staffUser = await User.create({
      email,
      password,
      phoneNumber,
      role: 'VENDOR_STAFF',
      status: 'ACTIVE',
      vendorId: req.user.vendorId,
      vendorPermissions: permissions
    });
    
    // Create staff user details
    await UserDetails.create({
      userId: staffUser.id,
      firstName,
      lastName,
      emailVerified: true,
      vendorId: req.user.vendorId
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Vendor staff registered successfully',
      data: {
        id: staffUser.id,
        email: staffUser.email,
        role: staffUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendVerification,
  requestPasswordReset,
  resetPassword,
  generateApiKey,
  revokeApiKey,
  registerVendor,
  registerVendorStaff
}; 