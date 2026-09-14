const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const bankService = require('../services/bankService');

/**
 * @route GET /api/bank-details
 * @desc Get all bank details for the user
 * @access Private
 */
const getUserBankDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const bankDetails = await bankService.getUserBankDetails(userId);
    
    return res.status(200).json({
      status: 'success',
      data: bankDetails
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/bank-details
 * @desc Add a new bank detail for the user
 * @access Private
 */
const addBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Extract and validate required fields
    const { 
      accountHolderName, 
      accountNumber, 
      confirmAccountNumber,
      ifscCode, 
      bankName,
      accountType = 'SAVINGS',
      branchName, 
      isDefault = false 
    } = req.body;
    
    // Input validation
    if (!accountHolderName || accountHolderName.length < 3) {
      throw new HttpError(400, 'Valid account holder name is required (min 3 characters)');
    }
    
    if (!accountNumber || !/^\d{9,18}$/.test(accountNumber)) {
      throw new HttpError(400, 'Valid account number is required (9-18 digits)');
    }
    
    if (accountNumber !== confirmAccountNumber) {
      throw new HttpError(400, 'Account number and confirmation do not match');
    }
    
    if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      throw new HttpError(400, 'Valid IFSC code is required (format: ABCD0123456)');
    }
    
    if (!bankName) {
      throw new HttpError(400, 'Bank name is required');
    }
    
    if (!['SAVINGS', 'CURRENT'].includes(accountType)) {
      throw new HttpError(400, 'Account type must be either SAVINGS or CURRENT');
    }
    
    // Check limit of bank accounts
    const existingAccounts = await bankService.getUserBankDetails(userId);
    if (existingAccounts.length >= 5) {
      throw new HttpError(400, 'Maximum limit of 5 bank accounts reached');
    }
    
    // Create bank detail
    const bankDetail = await bankService.addBankDetail(userId, {
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      accountType,
      branchName,
      isDefault
    });
    
    // Sanitize response (don't return full account number)
    bankDetail.accountNumber = bankDetail.accountNumber.replace(/^\d{5}/, '*****');
    
    return res.status(201).json({
      status: 'success',
      message: 'Bank account added successfully',
      data: bankDetail
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/bank-details/:id
 * @desc Get a specific bank detail
 * @access Private
 */
const getBankDetailById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Bank detail ID is required');
    }
    
    const bankDetail = await bankService.getBankDetailById(id, userId);
    
    if (!bankDetail) {
      throw new HttpError(404, 'Bank detail not found or does not belong to user');
    }
    
    // Sanitize response
    bankDetail.accountNumber = bankDetail.accountNumber.replace(/^\d{5}/, '*****');
    
    return res.status(200).json({
      status: 'success',
      data: bankDetail
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT /api/bank-details/:id
 * @desc Update a bank detail
 * @access Private
 */
const updateBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Bank detail ID is required');
    }
    
    // Check if bank detail exists and belongs to user
    const existingBankDetail = await bankService.getBankDetailById(id, userId);
    if (!existingBankDetail) {
      throw new HttpError(404, 'Bank detail not found or does not belong to user');
    }
    
    // Extract updatable fields
    const { 
      accountHolderName, 
      branchName, 
      isDefault
    } = req.body;
    
    // Security measure: only allow certain fields to be updated
    // Account number and IFSC cannot be changed - require deletion and re-addition
    const updates = {};
    
    if (accountHolderName !== undefined) {
      if (!accountHolderName || accountHolderName.length < 3) {
        throw new HttpError(400, 'Valid account holder name is required (min 3 characters)');
      }
      updates.accountHolderName = accountHolderName;
    }
    
    if (branchName !== undefined) {
      updates.branchName = branchName;
    }
    
    if (isDefault !== undefined) {
      updates.isDefault = Boolean(isDefault);
    }
    
    // Update bank detail
    const updatedBankDetail = await bankService.updateBankDetail(id, userId, updates);
    
    // Sanitize response
    updatedBankDetail.accountNumber = updatedBankDetail.accountNumber.replace(/^\d{5}/, '*****');
    
    return res.status(200).json({
      status: 'success',
      message: 'Bank account updated successfully',
      data: updatedBankDetail
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route DELETE /api/bank-details/:id
 * @desc Delete a bank detail
 * @access Private
 */
const deleteBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Bank detail ID is required');
    }
    
    // Check if bank detail exists and belongs to user
    const existingBankDetail = await bankService.getBankDetailById(id, userId);
    if (!existingBankDetail) {
      throw new HttpError(404, 'Bank detail not found or does not belong to user');
    }
    
    // Check if there are any pending transactions using this bank detail
    const hasPendingTransactions = await bankService.hasPendingTransactions(id);
    if (hasPendingTransactions) {
      throw new HttpError(400, 'Cannot delete bank account with pending transactions');
    }
    
    // Delete bank detail
    await bankService.deleteBankDetail(id, userId);
    
    return res.status(200).json({
      status: 'success',
      message: 'Bank account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT /api/bank-details/:id/set-default
 * @desc Set a bank detail as default
 * @access Private
 */
const setDefaultBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Bank detail ID is required');
    }
    
    // Check if bank detail exists and belongs to user
    const existingBankDetail = await bankService.getBankDetailById(id, userId);
    if (!existingBankDetail) {
      throw new HttpError(404, 'Bank detail not found or does not belong to user');
    }
    
    // Set as default
    await bankService.setDefaultBankDetail(id, userId);
    
    return res.status(200).json({
      status: 'success',
      message: 'Bank account set as default successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/bank-details/verify-ifsc/:code
 * @desc Verify IFSC code and get bank information
 * @access Private
 */
const verifyIfscCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    
    if (!code || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(code)) {
      throw new HttpError(400, 'Valid IFSC code is required (format: ABCD0123456)');
    }
    
    const bankInfo = await bankService.verifyIfscCode(code);
    
    return res.status(200).json({
      status: 'success',
      data: bankInfo
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserBankDetails,
  addBankDetail,
  getBankDetailById,
  updateBankDetail,
  deleteBankDetail,
  setDefaultBankDetail,
  verifyIfscCode
}; 