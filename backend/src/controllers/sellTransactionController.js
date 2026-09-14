const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const transactionService = require('../services/transactionService');
const bankService = require('../services/bankService');

/**
 * @route POST /api/sell
 * @desc Create a new sell transaction
 * @access Private
 */
const createSellTransaction = async (req, res, next) => {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;
    
    // Extract data from request body with validation
    const { weightInGrams, bankDetailId } = req.body;
    
    if (!weightInGrams || isNaN(Number(weightInGrams)) || Number(weightInGrams) <= 0) {
      throw new HttpError(400, 'Valid weight in grams is required');
    }
    
    if (!bankDetailId) {
      throw new HttpError(400, 'Bank detail ID is required');
    }
    
    // Verify bank detail belongs to user
    const bankDetail = await bankService.getBankDetailById(bankDetailId, userId);
    if (!bankDetail) {
      throw new HttpError(404, 'Bank detail not found or does not belong to user');
    }
    
    // Create the transaction
    const transaction = await transactionService.createSellTransaction(userId, {
      weightInGrams: Number(weightInGrams),
      bankDetailId
    });
    
    // Return successful response
    return res.status(201).json({
      status: 'success',
      message: 'Sell transaction initiated successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/sell
 * @desc Get all sell transactions for the user
 * @access Private
 */
const getUserSellTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;
    
    const transactions = await transactionService.getUserTransactions(userId, {
      type: 'SELL',
      status,
      page: parseInt(page),
      limit: parseInt(limit)
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
 * @route GET /api/sell/:id
 * @desc Get a specific sell transaction by ID
 * @access Private
 */
const getSellTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    const transaction = await transactionService.getTransactionById(id, userId);
    
    // Check if it's a sell transaction
    if (transaction.transactionType !== 'SELL') {
      throw new HttpError(400, 'Not a sell transaction');
    }
    
    // Fetch additional details
    const sellDetails = await transactionService.getSellTransactionDetails(id);
    
    // Get bank detail info
    const bankDetail = await bankService.getBankDetailById(sellDetails.bankDetailId, userId);
    
    return res.status(200).json({
      status: 'success',
      data: {
        ...transaction,
        sellDetails,
        bankDetail: {
          id: bankDetail.id,
          accountHolderName: bankDetail.accountHolderName,
          lastFourDigits: bankDetail.lastFourDigits,
          bankName: bankDetail.bankName,
          ifscCode: bankDetail.ifscCode
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/sell/:id/cancel
 * @desc Cancel a sell transaction
 * @access Private
 */
const cancelSellTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    // First check if it's a sell transaction
    const transaction = await transactionService.getTransactionById(id, userId);
    
    if (transaction.transactionType !== 'SELL') {
      throw new HttpError(400, 'Not a sell transaction');
    }
    
    // Now cancel it
    await transactionService.cancelTransaction(id, userId, reason);
    
    return res.status(200).json({
      status: 'success',
      message: 'Sell transaction cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/sell/summary
 * @desc Get summary of all sell transactions
 * @access Private
 */
const getSellTransactionsSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const summary = await transactionService.getUserTransactionSummary(userId, 'SELL');
    
    return res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/sell/current-rate
 * @desc Get current sell rate for gold
 * @access Public
 */
const getCurrentSellRate = async (req, res, next) => {
  try {
    const prices = await transactionService.getCurrentPrices();
    
    return res.status(200).json({
      status: 'success',
      data: {
        sellPrice: prices.sellPrice,
        timestamp: prices.timestamp
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/sell/calculate
 * @desc Calculate sell amount for given weight
 * @access Public
 */
const calculateSellAmount = async (req, res, next) => {
  try {
    const { weightInGrams } = req.query;
    
    if (!weightInGrams || isNaN(Number(weightInGrams)) || Number(weightInGrams) <= 0) {
      throw new HttpError(400, 'Valid weight in grams is required');
    }
    
    const prices = await transactionService.getCurrentPrices();
    const amount = Number(weightInGrams) * prices.sellPrice;
    
    return res.status(200).json({
      status: 'success',
      data: {
        weightInGrams: Number(weightInGrams),
        sellPricePerGram: prices.sellPrice,
        totalAmount: amount,
        timestamp: prices.timestamp
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSellTransaction,
  getUserSellTransactions,
  getSellTransactionById,
  cancelSellTransaction,
  getSellTransactionsSummary,
  getCurrentSellRate,
  calculateSellAmount
}; 