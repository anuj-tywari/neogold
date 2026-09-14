const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const vaultService = require('../services/vaultService');

/**
 * @route GET /api/vault/summary
 * @desc Get vault summary
 * @access Private (Admin only)
 */
const getVaultSummary = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      throw new HttpError(403, 'Unauthorized access to vault operations');
    }
    
    const summary = await vaultService.getVaultSummary(req.query.vendorId);
    
    return res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/vault/physical-addition
 * @desc Add physical gold to vault
 * @access Private (Admin only)
 */
const addPhysicalGold = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      throw new HttpError(403, 'Unauthorized access to vault operations');
    }
    
    const userId = req.user.id;
    
    // Extract and validate required fields
    const { 
      weightInGrams, 
      purity = '24K', 
      receiptNumber, 
      supplierName,
      purchasePrice,
      notes,
      vendorId 
    } = req.body;
    
    if (!weightInGrams || isNaN(Number(weightInGrams)) || Number(weightInGrams) <= 0) {
      throw new HttpError(400, 'Valid weight in grams is required');
    }
    
    if (!receiptNumber) {
      throw new HttpError(400, 'Receipt number is required');
    }
    
    if (!supplierName) {
      throw new HttpError(400, 'Supplier name is required');
    }
    
    // Check for receipt image
    let receiptImageUrl = null;
    if (req.files && req.files.receiptImage) {
      // In a real implementation, you would upload this file to a storage service
      // and set receiptImageUrl to the resulting URL
      receiptImageUrl = 'file_upload_placeholder_url';
    }
    
    // Record the addition
    const transaction = await vaultService.addPhysicalGold({
      weightInGrams: Number(weightInGrams),
      purity,
      receiptNumber,
      supplierName,
      purchasePrice: purchasePrice ? Number(purchasePrice) : null,
      notes,
      receiptImageUrl,
      performedBy: userId,
      vendorId
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Physical gold added to vault successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/vault/physical-removal
 * @desc Remove physical gold from vault
 * @access Private (Admin only)
 */
const removePhysicalGold = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      throw new HttpError(403, 'Unauthorized access to vault operations');
    }
    
    const userId = req.user.id;
    
    // Extract and validate required fields
    const { 
      weightInGrams, 
      purity = '24K', 
      receiptNumber, 
      notes,
      vendorId 
    } = req.body;
    
    if (!weightInGrams || isNaN(Number(weightInGrams)) || Number(weightInGrams) <= 0) {
      throw new HttpError(400, 'Valid weight in grams is required');
    }
    
    if (!receiptNumber) {
      throw new HttpError(400, 'Receipt number is required');
    }
    
    // Check for receipt image
    let receiptImageUrl = null;
    if (req.files && req.files.receiptImage) {
      // In a real implementation, you would upload this file to a storage service
      receiptImageUrl = 'file_upload_placeholder_url';
    }
    
    // Check if there's enough company-owned gold
    const summary = await vaultService.getVaultSummary(vendorId);
    if (summary.companyOwnedGoldInGrams < Number(weightInGrams)) {
      throw new HttpError(400, 'Not enough company-owned gold in vault for this removal');
    }
    
    // Record the removal
    const transaction = await vaultService.removePhysicalGold({
      weightInGrams: Number(weightInGrams),
      purity,
      receiptNumber,
      notes,
      receiptImageUrl,
      performedBy: userId,
      vendorId
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Physical gold removed from vault successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/vault/transactions
 * @desc Get vault transactions with pagination and filters
 * @access Private (Admin only)
 */
const getVaultTransactions = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      throw new HttpError(403, 'Unauthorized access to vault transactions');
    }
    
    const { 
      page = 1, 
      limit = 10, 
      type, 
      startDate, 
      endDate,
      vendorId 
    } = req.query;
    
    const transactions = await vaultService.getVaultTransactions({
      page: parseInt(page),
      limit: parseInt(limit),
      type,
      startDate,
      endDate,
      vendorId
    });
    
    return res.status(200).json({
      status: 'success',
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/vault/transactions/:id
 * @desc Get vault transaction by ID
 * @access Private (Admin only)
 */
const getVaultTransactionById = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      throw new HttpError(403, 'Unauthorized access to vault transactions');
    }
    
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    const transaction = await vaultService.getVaultTransactionById(id);
    
    if (!transaction) {
      throw new HttpError(404, 'Vault transaction not found');
    }
    
    return res.status(200).json({
      status: 'success',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVaultSummary,
  addPhysicalGold,
  removePhysicalGold,
  getVaultTransactions,
  getVaultTransactionById
}; 