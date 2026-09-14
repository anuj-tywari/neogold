const jwt = require('jsonwebtoken');
const { User, Wallet } = require('../models');
const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const { sequelize } = require('../models');

/**
 * Generate JWT token for authenticated user
 * @param {Object} user - User object
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || '1d' }
  );
};

/**
 * Generate refresh token for extended sessions
 * @param {Object} user - User object
 * @returns {String} Refresh token
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
  );
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} New user and tokens
 */
const register = async (userData) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { email: userData.email }
    });
    
    if (existingUser) {
      throw new HttpError('User with this email already exists', 409);
    }
    
    // Create new user
    const user = await User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || null
    }, { transaction });
    
    // Create wallet for the user
    await Wallet.create({
      userId: user.id
    }, { transaction });
    
    await transaction.commit();
    
    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Update last login
    await User.update(
      { lastLogin: new Date() },
      { where: { id: user.id } }
    );
    
    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    };
  } catch (error) {
    await transaction.rollback();
    logger.error(`Registration error: ${error.message}`);
    throw error;
  }
};

/**
 * Login a user
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Object} User and tokens
 */
const login = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({
      where: { email }
    });
    
    if (!user) {
      throw new HttpError('Invalid email or password', 401);
    }
    
    // Check if user is active
    if (!user.isActive) {
      throw new HttpError('This account has been deactivated', 403);
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new HttpError('Invalid email or password', 401);
    }
    
    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Update last login
    await User.update(
      { lastLogin: new Date() },
      { where: { id: user.id } }
    );
    
    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      token,
      refreshToken
    };
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    throw error;
  }
};

/**
 * Refresh access token using refresh token
 * @param {String} refreshToken - Refresh token
 * @returns {Object} New access token and refresh token
 */
const refreshToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
      throw new HttpError('Invalid refresh token', 401);
    }
    
    // Find user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    
    // Check if user is active
    if (!user.isActive) {
      throw new HttpError('This account has been deactivated', 403);
    }
    
    // Generate new tokens
    const newToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);
    
    return {
      token: newToken,
      refreshToken: newRefreshToken
    };
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`);
    throw error;
  }
};

/**
 * Request password reset
 * @param {String} email - User email
 * @returns {String} Reset token
 */
const forgotPassword = async (email) => {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpError('User with this email does not exist', 404);
    }
    
    // Generate password reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();
    
    return resetToken;
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    throw error;
  }
};

/**
 * Reset password using token
 * @param {String} token - Reset token
 * @param {String} password - New password
 * @returns {Boolean} Success status
 */
const resetPassword = async (token, password) => {
  try {
    // Hash the provided token to compare with stored hash
    const hashedToken = require('crypto')
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user by reset token and check expiry
    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          [sequelize.Sequelize.Op.gt]: Date.now()
        }
      }
    });
    
    if (!user) {
      throw new HttpError('Invalid or expired token', 400);
    }
    
    // Update password and clear reset fields
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    
    return true;
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    throw error;
  }
};

/**
 * Change user password (when already logged in)
 * @param {String} userId - User ID
 * @param {String} currentPassword - Current password
 * @param {String} newPassword - New password
 * @returns {Boolean} Success status
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    
    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new HttpError('Current password is incorrect', 401);
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    return true;
  } catch (error) {
    logger.error(`Change password error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword
}; 