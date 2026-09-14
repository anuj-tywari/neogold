const { validationResult, body, param, query } = require('express-validator');
const { HttpError } = require('./errorHandler');

/**
 * Middleware to validate the request against provided validation rules
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg
    }));
    
    return next(new HttpError('Validation error', 400, { errors: errorMessages }));
  }
  next();
};

/**
 * Validation rules for user authentication
 */
const authValidation = {
  // Login validation
  login: [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ],
  
  // Registration validation
  register: [
    body('firstName')
      .notEmpty().withMessage('First name is required')
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
      .notEmpty().withMessage('Last name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('confirmPassword')
      .notEmpty().withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
    body('phone')
      .optional()
      .isMobilePhone().withMessage('Please provide a valid phone number')
  ],
  
  // Forgot password validation
  forgotPassword: [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email')
  ],
  
  // Reset password validation
  resetPassword: [
    body('token')
      .notEmpty().withMessage('Reset token is required'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('confirmPassword')
      .notEmpty().withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      })
  ],
  
  // Change password validation
  changePassword: [
    body('currentPassword')
      .notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .notEmpty().withMessage('New password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('confirmPassword')
      .notEmpty().withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Passwords do not match');
        }
        return true;
      })
  ]
};

/**
 * Validation rules for user profile
 */
const userValidation = {
  // Update profile validation
  updateProfile: [
    body('firstName')
      .optional()
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
      .optional()
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
    body('phone')
      .optional()
      .isMobilePhone().withMessage('Please provide a valid phone number'),
    body('address')
      .optional()
      .isLength({ max: 200 }).withMessage('Address cannot exceed 200 characters')
  ],
  
  // Get user by ID validation
  getUserById: [
    param('id')
      .isUUID(4).withMessage('Invalid user ID format')
  ]
};

/**
 * Validation rules for bank details
 */
const bankValidation = {
  // Create bank detail validation
  createBankDetail: [
    body('accountHolderName')
      .notEmpty().withMessage('Account holder name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Account holder name must be between 2 and 100 characters'),
    body('accountNumber')
      .notEmpty().withMessage('Account number is required')
      .isLength({ min: 5, max: 20 }).withMessage('Account number must be between 5 and 20 characters'),
    body('ifscCode')
      .notEmpty().withMessage('IFSC code is required')
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/).withMessage('Please provide a valid IFSC code'),
    body('bankName')
      .notEmpty().withMessage('Bank name is required'),
    body('accountType')
      .notEmpty().withMessage('Account type is required')
      .isIn(['SAVINGS', 'CURRENT']).withMessage('Account type must be either SAVINGS or CURRENT')
  ],
  
  // Update bank detail validation
  updateBankDetail: [
    param('id')
      .isUUID(4).withMessage('Invalid bank detail ID format'),
    body('accountHolderName')
      .optional()
      .isLength({ min: 2, max: 100 }).withMessage('Account holder name must be between 2 and 100 characters'),
    body('accountNumber')
      .optional()
      .isLength({ min: 5, max: 20 }).withMessage('Account number must be between 5 and 20 characters'),
    body('ifscCode')
      .optional()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/).withMessage('Please provide a valid IFSC code'),
    body('bankName')
      .optional(),
    body('accountType')
      .optional()
      .isIn(['SAVINGS', 'CURRENT']).withMessage('Account type must be either SAVINGS or CURRENT')
  ]
};

/**
 * Validation rules for transactions
 */
const transactionValidation = {
  // Buy gold validation
  buyGold: [
    body('amount')
      .notEmpty().withMessage('Amount is required')
      .isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('weightInGrams')
      .optional()
      .isFloat({ min: 0.001 }).withMessage('Weight must be greater than 0'),
    body('paymentMethod')
      .notEmpty().withMessage('Payment method is required')
      .isIn(['UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING']).withMessage('Invalid payment method')
  ],
  
  // Sell gold validation
  sellGold: [
    body('weightInGrams')
      .notEmpty().withMessage('Weight is required')
      .isFloat({ min: 0.001 }).withMessage('Weight must be greater than 0'),
    body('bankDetailId')
      .notEmpty().withMessage('Bank detail ID is required')
      .isUUID(4).withMessage('Invalid bank detail ID format')
  ],
  
  // Redeem gold validation
  redeemGold: [
    body('weightInGrams')
      .notEmpty().withMessage('Weight is required')
      .isFloat({ min: 0.5 }).withMessage('Weight must be at least 0.5 grams'),
    body('deliveryAddress')
      .notEmpty().withMessage('Delivery address is required')
      .isLength({ min: 10, max: 500 }).withMessage('Delivery address must be between 10 and 500 characters'),
    body('contactPhone')
      .notEmpty().withMessage('Contact phone is required')
      .isMobilePhone().withMessage('Please provide a valid phone number')
  ],
  
  // Payment verification validation
  verifyPayment: [
    body('transactionId')
      .notEmpty().withMessage('Transaction ID is required')
      .isUUID(4).withMessage('Invalid transaction ID format'),
    body('paymentId')
      .notEmpty().withMessage('Payment ID is required'),
    body('paymentStatus')
      .notEmpty().withMessage('Payment status is required')
      .isIn(['SUCCESS', 'FAILURE']).withMessage('Payment status must be either SUCCESS or FAILURE')
  ]
};

module.exports = {
  validate,
  authValidation,
  userValidation,
  bankValidation,
  transactionValidation
}; 