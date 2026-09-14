const jwt = require('jsonwebtoken');
const { User, Vendor } = require('../models');
const { HttpError } = require('./errorHandler');
const logger = require('../utils/logger');

/**
 * JWT Authentication middleware
 * Verifies the JWT token in the Authorization header
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError(401, 'Authorization token required');
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists and is active
    const user = await User.findOne({ 
      where: { 
        id: decoded.id,
        status: 'ACTIVE'
      }
    });
    
    if (!user) {
      throw new HttpError(401, 'User not found or account inactive');
    }
    
    // Add user to request
    req.user = user;
    
    // Track last login
    await user.update({ lastLogin: new Date() });
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new HttpError(401, 'Invalid or expired token'));
    }
    next(error);
  }
};

/**
 * API Key Authentication middleware
 * Validates the API key and secret in the request headers
 */
const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    const apiSecret = req.headers['x-api-secret'];
    
    if (!apiKey || !apiSecret) {
      throw new HttpError(401, 'API key and secret required');
    }
    
    // Find user with this API key
    const user = await User.findOne({
      where: {
        apiKey,
        apiKeyEnabled: true,
        status: 'ACTIVE'
      }
    });
    
    if (!user) {
      throw new HttpError(401, 'Invalid API key or API access disabled');
    }
    
    // Verify API secret
    const isValidSecret = await user.verifyApiSecret(apiSecret);
    if (!isValidSecret) {
      throw new HttpError(401, 'Invalid API secret');
    }
    
    // Add user to request
    req.user = user;
    
    // Track last login
    await user.update({ lastLogin: new Date() });
    
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Authentication middleware that tries both JWT and API key authentication
 * Useful for endpoints that can be accessed via both methods
 */
const authenticateAny = async (req, res, next) => {
  try {
    // Try JWT auth first
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ 
          where: { 
            id: decoded.id,
            status: 'ACTIVE'
          }
        });
        
        if (user) {
          req.user = user;
          await user.update({ lastLogin: new Date() });
          return next();
        }
      } catch (error) {
        // JWT auth failed, continue to API key auth
        logger.debug('JWT auth failed, trying API key auth');
      }
    }
    
    // Try API key auth
    const apiKey = req.headers['x-api-key'];
    const apiSecret = req.headers['x-api-secret'];
    
    if (apiKey && apiSecret) {
      const user = await User.findOne({
        where: {
          apiKey,
          apiKeyEnabled: true,
          status: 'ACTIVE'
        }
      });
      
      if (user) {
        const isValidSecret = await user.verifyApiSecret(apiSecret);
        if (isValidSecret) {
          req.user = user;
          await user.update({ lastLogin: new Date() });
          return next();
        }
      }
    }
    
    // If we reach here, both auth methods failed
    throw new HttpError(401, 'Authentication required');
  } catch (error) {
    next(error);
  }
};

/**
 * Role-based authorization middleware
 * @param {string[]} roles - Array of allowed roles
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new HttpError(401, 'Authentication required'));
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return next(new HttpError(403, 'Insufficient permissions'));
    }
    
    next();
  };
};

/**
 * Vendor-specific authorization middleware
 * Checks if the user belongs to the vendor specified in the request
 */
const authorizeVendor = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new HttpError(401, 'Authentication required');
    }
    
    const vendorId = req.params.vendorId || req.body.vendorId || req.query.vendorId;
    
    // If no vendorId in request, user's vendorId is used by default
    if (!vendorId) {
      // For admin users, this is fine
      if (['ADMIN'].includes(req.user.role)) {
        return next();
      }
      
      // For vendor users, they must have a vendorId
      if (['VENDOR_ADMIN', 'VENDOR_STAFF'].includes(req.user.role) && !req.user.vendorId) {
        throw new HttpError(403, 'Vendor ID required');
      }
      
      return next();
    }
    
    // For admin users, any vendor is accessible
    if (req.user.role === 'ADMIN') {
      // Just verify the vendor exists
      const vendor = await Vendor.findByPk(vendorId);
      if (!vendor) {
        throw new HttpError(404, 'Vendor not found');
      }
      return next();
    }
    
    // For vendor users, they can only access their own vendor
    if (['VENDOR_ADMIN', 'VENDOR_STAFF'].includes(req.user.role)) {
      if (req.user.vendorId !== vendorId) {
        throw new HttpError(403, 'Unauthorized vendor access');
      }
      return next();
    }
    
    // Regular users can only access their own vendor's data
    if (req.user.role === 'USER' && req.user.vendorId) {
      if (req.user.vendorId !== vendorId) {
        throw new HttpError(403, 'Unauthorized vendor access');
      }
      return next();
    }
    
    throw new HttpError(403, 'Insufficient permissions');
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to refresh the JWT token
 */
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new HttpError(400, 'Refresh token required');
    }
    
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find user and check if refresh token matches
    const user = await User.findOne({
      where: {
        id: decoded.id,
        refreshToken,
        status: 'ACTIVE'
      }
    });
    
    if (!user) {
      throw new HttpError(401, 'Invalid refresh token');
    }
    
    // Generate new tokens
    const newAccessToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();
    
    // Update refresh token in database
    await user.update({ refreshToken: newRefreshToken });
    
    // Send new tokens
    res.status(200).json({
      status: 'success',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new HttpError(401, 'Invalid or expired refresh token'));
    }
    next(error);
  }
};

module.exports = {
  authenticate,
  authenticateApiKey,
  authenticateAny,
  authorize,
  authorizeVendor,
  refreshToken
};