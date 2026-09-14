const userService = require('../services/userService');
const logger = require('../utils/logger');
const { HttpError } = require('../middleware/errorHandler');

/**
 * Get user profile
 * @route GET /api/users/profile
 */
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await userService.getUserProfile(userId);
    
    res.status(200).json({
      status: 'success',
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * @route PUT /api/users/profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    const updatedProfile = await userService.updateUserProfile(userId, profileData);
    
    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user bank details
 * @route GET /api/users/bank-details
 */
const getBankDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bankDetails = await userService.getUserBankDetails(userId);
    
    res.status(200).json({
      status: 'success',
      data: bankDetails
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create bank detail
 * @route POST /api/users/bank-details
 */
const createBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bankData = req.body;
    
    const bankDetail = await userService.createBankDetail(userId, bankData);
    
    res.status(201).json({
      status: 'success',
      message: 'Bank detail added successfully',
      data: bankDetail
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update bank detail
 * @route PUT /api/users/bank-details/:id
 */
const updateBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bankDetailId = req.params.id;
    const bankData = req.body;
    
    const bankDetail = await userService.updateBankDetail(userId, bankDetailId, bankData);
    
    res.status(200).json({
      status: 'success',
      message: 'Bank detail updated successfully',
      data: bankDetail
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete bank detail
 * @route DELETE /api/users/bank-details/:id
 */
const deleteBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bankDetailId = req.params.id;
    
    await userService.deleteBankDetail(userId, bankDetailId);
    
    res.status(200).json({
      status: 'success',
      message: 'Bank detail deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Set primary bank detail
 * @route PUT /api/users/bank-details/:id/primary
 */
const setPrimaryBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bankDetailId = req.params.id;
    
    await userService.setPrimaryBankDetail(userId, bankDetailId);
    
    res.status(200).json({
      status: 'success',
      message: 'Primary bank detail set successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user KYC details
 * @route GET /api/users/kyc
 */
const getKycDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const kycDetails = await userService.getUserKycDetails(userId);
    
    res.status(200).json({
      status: 'success',
      data: kycDetails
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit KYC
 * @route POST /api/users/kyc
 */
const submitKyc = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const kycData = req.body;
    
    // Handle file uploads in a real implementation
    // req.files would contain uploaded documents
    
    const kycDetails = await userService.submitKyc(userId, kycData);
    
    res.status(201).json({
      status: 'success',
      message: 'KYC submitted successfully',
      data: kycDetails
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user wallet
 * @route GET /api/users/wallet
 */
const getWallet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const wallet = await userService.getUserWallet(userId);
    
    res.status(200).json({
      status: 'success',
      data: wallet
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user transactions
 * @route GET /api/users/transactions
 */
const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, status, page = 1, limit = 10 } = req.query;
    
    const transactions = await userService.getUserTransactions(userId, {
      type,
      status,
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    res.status(200).json({
      status: 'success',
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getBankDetails,
  createBankDetail,
  updateBankDetail,
  deleteBankDetail,
  setPrimaryBankDetail,
  getKycDetails,
  submitKyc,
  getWallet,
  getTransactions
}; 