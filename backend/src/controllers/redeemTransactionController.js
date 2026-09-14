const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const transactionService = require('../services/transactionService');
const productService = require('../services/productService');

/**
 * @route POST /api/redeem
 * @desc Create a new redeem transaction
 * @access Private
 */
const createRedeemTransaction = async (req, res, next) => {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;
    
    // Extract data from request body with validation
    const { weightInGrams, productId, quantity, deliveryAddress } = req.body;
    
    // Validate address data
    if (!deliveryAddress || !deliveryAddress.addressLine1 || !deliveryAddress.city || 
        !deliveryAddress.state || !deliveryAddress.postalCode || !deliveryAddress.country) {
      throw new HttpError(400, 'Complete delivery address is required');
    }
    
    let redeemData = {};
    
    if (productId) {
      // Product-based redemption
      if (!productId) {
        throw new HttpError(400, 'Product ID is required');
      }
      
      if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
        throw new HttpError(400, 'Valid quantity is required');
      }
      
      // Verify product exists
      const product = await productService.getProductById(productId);
      
      redeemData = {
        productId,
        quantity: Number(quantity),
        deliveryAddress
      };
    } else {
      // Weight-based redemption
      if (!weightInGrams || isNaN(Number(weightInGrams)) || Number(weightInGrams) < 0.5) {
        throw new HttpError(400, 'Valid weight in grams is required (minimum 0.5g)');
      }
      
      redeemData = {
        weightInGrams: Number(weightInGrams),
        deliveryAddress
      };
    }
    
    // Create the transaction
    const transaction = await transactionService.createRedeemTransaction(userId, redeemData);
    
    // Return successful response
    return res.status(201).json({
      status: 'success',
      message: 'Redeem transaction initiated successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/redeem
 * @desc Get all redeem transactions for the user
 * @access Private
 */
const getUserRedeemTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;
    
    const transactions = await transactionService.getUserTransactions(userId, {
      type: 'REDEEM',
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
 * @route GET /api/redeem/:id
 * @desc Get a specific redeem transaction by ID
 * @access Private
 */
const getRedeemTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    const transaction = await transactionService.getTransactionById(id, userId);
    
    // Check if it's a redeem transaction
    if (transaction.transactionType !== 'REDEEM') {
      throw new HttpError(400, 'Not a redeem transaction');
    }
    
    // Fetch additional details
    const redeemDetails = await transactionService.getRedeemTransactionDetails(id);
    
    // Fetch product details if applicable
    let productDetails = null;
    if (redeemDetails.productId) {
      productDetails = await productService.getProductById(redeemDetails.productId);
    }
    
    return res.status(200).json({
      status: 'success',
      data: {
        ...transaction,
        redeemDetails,
        product: productDetails
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/redeem/:id/cancel
 * @desc Cancel a redeem transaction
 * @access Private
 */
const cancelRedeemTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    // First check if it's a redeem transaction
    const transaction = await transactionService.getTransactionById(id, userId);
    
    if (transaction.transactionType !== 'REDEEM') {
      throw new HttpError(400, 'Not a redeem transaction');
    }
    
    // Get redeem details to check shipping status
    const redeemDetails = await transactionService.getRedeemTransactionDetails(id);
    
    // Cannot cancel if already shipped
    if (['DISPATCHED', 'IN_TRANSIT', 'DELIVERED'].includes(redeemDetails.deliveryStatus)) {
      throw new HttpError(400, 'Cannot cancel transaction as the product has already been shipped');
    }
    
    // Now cancel it
    await transactionService.cancelTransaction(id, userId, reason);
    
    return res.status(200).json({
      status: 'success',
      message: 'Redeem transaction cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/redeem/:id/track
 * @desc Track shipment for a redeem transaction
 * @access Private
 */
const trackRedeemTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    if (!id) {
      throw new HttpError(400, 'Transaction ID is required');
    }
    
    // First check if it's a redeem transaction
    const transaction = await transactionService.getTransactionById(id, userId);
    
    if (transaction.transactionType !== 'REDEEM') {
      throw new HttpError(400, 'Not a redeem transaction');
    }
    
    // Get tracking info
    const trackingInfo = await transactionService.getRedeemTransactionTracking(id);
    
    return res.status(200).json({
      status: 'success',
      data: trackingInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/redeem/eligible-products
 * @desc Get products eligible for redemption
 * @access Private
 */
const getEligibleRedeemProducts = async (req, res, next) => {
  try {
    const products = await productService.getEligibleRedemptionProducts();
    
    return res.status(200).json({
      status: 'success',
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/redeem/delivery-charges
 * @desc Calculate delivery charges for redemption
 * @access Private
 */
const calculateDeliveryCharges = async (req, res, next) => {
  try {
    const { weightInGrams, pincode } = req.query;
    
    if (!weightInGrams || isNaN(Number(weightInGrams)) || Number(weightInGrams) <= 0) {
      throw new HttpError(400, 'Valid weight in grams is required');
    }
    
    if (!pincode) {
      throw new HttpError(400, 'Delivery pincode is required');
    }
    
    const charges = await transactionService.calculateRedeemDeliveryCharges(Number(weightInGrams), pincode);
    
    return res.status(200).json({
      status: 'success',
      data: charges
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/redeem/summary
 * @desc Get summary of all redeem transactions
 * @access Private
 */
const getRedeemTransactionsSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const summary = await transactionService.getUserTransactionSummary(userId, 'REDEEM');
    
    return res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRedeemTransaction,
  getUserRedeemTransactions,
  getRedeemTransactionById,
  cancelRedeemTransaction,
  trackRedeemTransaction,
  getEligibleRedeemProducts,
  calculateDeliveryCharges,
  getRedeemTransactionsSummary
}; 