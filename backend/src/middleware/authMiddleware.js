const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { HttpError } = require('./errorHandler');
const logger = require('../utils/logger');

/**
 * Middleware to authenticate users based on JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new HttpError('Invalid token format', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new HttpError('Invalid token', 401);
    }

    // Find user from token
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    // Check if token is issued after password change
    const passwordChangedAt = user.passwordChangedAt ? new Date(user.passwordChangedAt).getTime() / 1000 : 0;
    if (decoded.iat < passwordChangedAt) {
      throw new HttpError('User recently changed password. Please login again', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new HttpError('User account is inactive', 403);
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return next(new HttpError('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new HttpError('Token expired', 401));
    }
    next(error);
  }
};

/**
 * Middleware to restrict access to specific roles
 * @param {Array} roles - Array of roles allowed to access the route
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new HttpError('User not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new HttpError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

/**
 * Middleware to verify refresh token
 */
const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new HttpError('Refresh token not provided', 400);
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
      throw new HttpError('Invalid refresh token', 401);
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    // Check if refresh token is in the user's valid tokens list (optional, implement if needed)
    // if (!user.refreshTokens.includes(refreshToken)) {
    //   throw new HttpError('Invalid refresh token', 401);
    // }

    req.user = user;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new HttpError('Refresh token expired, please login again', 401));
    }
    next(error);
  }
};

module.exports = {
  authenticate,
  restrictTo,
  verifyRefreshToken
}; 