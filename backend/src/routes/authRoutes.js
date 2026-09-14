const express = require('express');
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/reset-password', authController.requestPasswordReset);
router.post('/reset-password/:token', authController.resetPassword);

// Protected routes
router.post('/logout', authenticate, authController.logoutUser);

// API Key management (Admin & Vendor Admin only)
router.post('/api-keys', authenticate, authController.generateApiKey);
router.delete('/api-keys', authenticate, authController.revokeApiKey);

// Vendor routes (Admin only)
router.post('/vendor/register', 
  authenticate, 
  authorize(['ADMIN']), 
  authController.registerVendor
);

// Vendor staff routes (Vendor Admin only)
router.post('/vendor/staff', 
  authenticate, 
  authorize(['VENDOR_ADMIN']), 
  authController.registerVendorStaff
);

module.exports = router; 