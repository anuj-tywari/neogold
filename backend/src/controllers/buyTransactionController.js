const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const transactionService = require('../services/transactionService');

/**
 * @route POST /api/buy
 * @desc Create a new buy transaction
 * @access Private
 */
const createBuyTransaction = async (req, res, next) => {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;
    
    // Extract data from request body with validation
    const { amount, paymentMethod, deliveryAddress } = req.body;
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      throw new HttpError(400, 'Valid amount is required');
    }
    
    if (!paymentMethod) {
      throw new HttpError(400, 'Payment method is required');
    }
    
    // Create the transaction
    const transaction = await transactionService.createBuyTransaction(userId, {
      amount: Number(amount),
      paymentMethod,
      deliveryAddress
    });
    
    // Return successful response
    return res.status(201).json({
      status: 'success',
      message: 'Buy transaction initiated successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/buy
 * @desc Get all buy transactions for the user
 * @access Private
 */
const getUserBuyTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;
    
    const transactions = await transactionService.getUserTransactions(userId, {
      type: 'BUY',
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
 * @route GET /api/buy/:id
 * @desc Get a specific buy transaction by ID
 * @access Private
 */
const getBuyTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    const transaction = await transactionService.getTransactionById(id, userId);
    
    // Check if it's a buy transaction
    if (transaction.transactionType !== 'BUY') {
      throw new HttpError(400, 'Not a buy transaction');
    }
    
    // Fetch additional details
    const buyDetails = await transactionService.getBuyTransactionDetails(id);
    
    return res.status(200).json({
      status: 'success',
      data: {
        ...transaction,
        buyDetails
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/buy/:id/verify-payment
 * @desc Verify payment for a buy transaction
 * @access Private
 */
const verifyBuyPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const paymentDetails = req.body;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    if (!paymentDetails) {
      throw new HttpError(400, 'Payment details are required');
    }
    
    const result = await transactionService.verifyBuyPayment(userId, id, paymentDetails);
    
    return res.status(200).json({
      status: 'success',
      message: 'Payment verified successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/buy/:id/cancel
 * @desc Cancel a buy transaction
 * @access Private
 */
const cancelBuyTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    // First check if it's a buy transaction
    const transaction = await transactionService.getTransactionById(id, userId);
    
    if (transaction.transactionType !== 'BUY') {
      throw new HttpError(400, 'Not a buy transaction');
    }
    
    // Now cancel it
    await transactionService.cancelTransaction(id, userId, reason);
    
    return res.status(200).json({
      status: 'success',
      message: 'Buy transaction cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/buy/summary
 * @desc Get summary of all buy transactions
 * @access Private
 */
const getBuyTransactionsSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const summary = await transactionService.getUserTransactionSummary(userId, 'BUY');
    
    return res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBuyTransaction,
  getUserBuyTransactions,
  getBuyTransactionById,
  verifyBuyPayment,
  cancelBuyTransaction,
  getBuyTransactionsSummary
}; 