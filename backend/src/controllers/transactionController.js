const express = require('express');
const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const transactionService = require('../services/transactionService');
const { authenticateJWT } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { buySchema, sellSchema, redeemSchema } = require('../schemas/transactionSchema');

const router = express.Router();

/**
 * @route GET /api/transactions/price
 * @desc Get current buy and sell prices
 * @access Public
 */
router.get('/price', async (req, res, next) => {
  try {
    const prices = await transactionService.getCurrentPrices();
    res.json(prices);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/transactions/buy
 * @desc Buy gold
 * @access Private
 */
router.post('/buy', [authenticateJWT, validate(buySchema)], async (req, res, next) => {
  try {
    const { amount, paymentMethod, deliveryAddress } = req.body;
    const userId = req.user.id;
    
    const transaction = await transactionService.createBuyTransaction(userId, {
      amount,
      paymentMethod,
      deliveryAddress
    });
    
    res.status(201).json({
      message: 'Buy transaction initiated successfully',
      transaction
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/transactions/sell
 * @desc Sell gold
 * @access Private
 */
router.post('/sell', [authenticateJWT, validate(sellSchema)], async (req, res, next) => {
  try {
    const { weightInGrams, bankDetailId } = req.body;
    const userId = req.user.id;
    
    const transaction = await transactionService.createSellTransaction(userId, {
      weightInGrams,
      bankDetailId
    });
    
    res.status(201).json({
      message: 'Sell transaction initiated successfully',
      transaction
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/transactions/redeem
 * @desc Redeem physical gold
 * @access Private
 */
router.post('/redeem', [authenticateJWT, validate(redeemSchema)], async (req, res, next) => {
  try {
    const { weightInGrams, deliveryAddress } = req.body;
    const userId = req.user.id;
    
    const transaction = await transactionService.createRedeemTransaction(userId, {
      weightInGrams,
      deliveryAddress
    });
    
    res.status(201).json({
      message: 'Redemption initiated successfully',
      transaction
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/transactions/:id
 * @desc Get transaction details
 * @access Private
 */
router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const transaction = await transactionService.getTransactionById(id, userId);
    
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/transactions/:id/status
 * @desc Check transaction status
 * @access Private
 */
router.get('/:id/status', authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const status = await transactionService.getTransactionStatus(id, userId);
    
    res.json(status);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/transactions/buy/verify-payment
 * @desc Verify payment for buy transaction
 * @access Private
 */
router.post('/buy/verify-payment', authenticateJWT, async (req, res, next) => {
  try {
    const { transactionId, paymentDetails } = req.body;
    const userId = req.user.id;
    
    const result = await transactionService.verifyBuyPayment(userId, transactionId, paymentDetails);
    
    res.json({
      message: 'Payment verification successful',
      status: result.status
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/transactions/:id/cancel
 * @desc Cancel a transaction
 * @access Private
 */
router.post('/:id/cancel', authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await transactionService.cancelTransaction(id, userId);
    
    res.json({
      message: 'Transaction cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 