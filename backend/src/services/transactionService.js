const { db } = require('../config/database');
const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const userService = require('./userService');
const priceService = require('./priceService');
const goldService = require('./goldService');
const notificationService = require('./notificationService');

/**
 * Get current gold buy and sell prices
 * @returns {Object} Current prices
 */
async function getCurrentPrices() {
  try {
    const prices = await priceService.getLatestPrices();
    return {
      buyPrice: prices.buyPrice,
      sellPrice: prices.sellPrice,
      timestamp: prices.updatedAt
    };
  } catch (error) {
    logger.error('Error fetching current prices', { error });
    throw new HttpError(500, 'Unable to fetch current prices');
  }
}

/**
 * Create a buy transaction
 * @param {string} userId - User ID
 * @param {Object} data - Transaction data
 * @param {number} data.amount - Amount in INR
 * @param {string} data.paymentMethod - Payment method (UPI, BANK_TRANSFER, etc.)
 * @param {Object} [data.deliveryAddress] - Delivery address for physical gold
 * @returns {Object} Created transaction
 */
async function createBuyTransaction(userId, data) {
  const { amount, paymentMethod, deliveryAddress } = data;
  
  if (amount <= 0) {
    throw new HttpError(400, 'Amount must be greater than zero');
  }
  
  // Get user profile to check KYC status
  const userProfile = await userService.getUserProfile(userId);
  
  if (!userProfile.kycVerified) {
    throw new HttpError(403, 'KYC verification required before making transactions');
  }
  
  // Get current buy price
  const prices = await priceService.getLatestPrices();
  const buyPrice = prices.buyPrice;
  
  // Calculate gold weight
  const weightInGrams = amount / buyPrice;
  
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    // Create transaction record
    const transaction = await trx('transactions').insert({
      userId,
      type: 'BUY',
      amount,
      weightInGrams,
      pricePerGram: buyPrice,
      paymentMethod,
      status: 'INITIATED',
      deliveryAddress: deliveryAddress ? JSON.stringify(deliveryAddress) : null,
      createdAt: new Date()
    }).returning('*');
    
    await trx.commit();
    
    // Send notification
    await notificationService.sendTransactionNotification(userId, {
      type: 'TRANSACTION_INITIATED',
      transactionId: transaction[0].id,
      amount,
      transactionType: 'BUY'
    });
    
    return transaction[0];
  } catch (error) {
    await trx.rollback();
    logger.error('Error creating buy transaction', { error, userId });
    throw new HttpError(500, 'Failed to create buy transaction');
  }
}

/**
 * Create a sell transaction
 * @param {string} userId - User ID
 * @param {Object} data - Transaction data
 * @param {number} data.weightInGrams - Gold weight in grams
 * @param {string} data.bankDetailId - Bank detail ID for receiving payment
 * @returns {Object} Created transaction
 */
async function createSellTransaction(userId, data) {
  const { weightInGrams, bankDetailId } = data;
  
  if (weightInGrams <= 0) {
    throw new HttpError(400, 'Weight must be greater than zero');
  }
  
  // Get user profile to check KYC status
  const userProfile = await userService.getUserProfile(userId);
  
  if (!userProfile.kycVerified) {
    throw new HttpError(403, 'KYC verification required before making transactions');
  }
  
  // Check if user has sufficient gold balance
  const wallet = await userService.getUserWallet(userId);
  
  if (wallet.goldBalance < weightInGrams) {
    throw new HttpError(400, 'Insufficient gold balance');
  }
  
  // Verify bank details
  const bankDetails = await userService.getUserBankDetails(userId);
  const validBankDetail = bankDetails.find(detail => detail.id === bankDetailId);
  
  if (!validBankDetail) {
    throw new HttpError(400, 'Invalid bank detail provided');
  }
  
  // Get current sell price
  const prices = await priceService.getLatestPrices();
  const sellPrice = prices.sellPrice;
  
  // Calculate amount
  const amount = weightInGrams * sellPrice;
  
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    // Create transaction record
    const transaction = await trx('transactions').insert({
      userId,
      type: 'SELL',
      amount,
      weightInGrams,
      pricePerGram: sellPrice,
      status: 'INITIATED',
      bankDetailId,
      createdAt: new Date()
    }).returning('*');
    
    // Reduce gold balance
    await trx('user_wallets')
      .where({ userId })
      .decrement('goldBalance', weightInGrams)
      .increment('goldLockedForSell', weightInGrams);
    
    await trx.commit();
    
    // Send notification
    await notificationService.sendTransactionNotification(userId, {
      type: 'TRANSACTION_INITIATED',
      transactionId: transaction[0].id,
      amount,
      transactionType: 'SELL'
    });
    
    return transaction[0];
  } catch (error) {
    await trx.rollback();
    logger.error('Error creating sell transaction', { error, userId });
    throw new HttpError(500, 'Failed to create sell transaction');
  }
}

/**
 * Create a redeem transaction (convert digital gold to physical)
 * @param {string} userId - User ID
 * @param {Object} data - Transaction data
 * @param {number} data.weightInGrams - Gold weight in grams
 * @param {Object} data.deliveryAddress - Delivery address
 * @returns {Object} Created transaction
 */
async function createRedeemTransaction(userId, data) {
  const { weightInGrams, deliveryAddress } = data;
  
  if (weightInGrams < 1) {
    throw new HttpError(400, 'Minimum 1 gram required for redemption');
  }
  
  // Get user profile to check KYC status
  const userProfile = await userService.getUserProfile(userId);
  
  if (!userProfile.kycVerified) {
    throw new HttpError(403, 'KYC verification required before making transactions');
  }
  
  // Check if user has sufficient gold balance
  const wallet = await userService.getUserWallet(userId);
  
  if (wallet.goldBalance < weightInGrams) {
    throw new HttpError(400, 'Insufficient gold balance');
  }
  
  if (!deliveryAddress || !deliveryAddress.address || !deliveryAddress.city || 
      !deliveryAddress.state || !deliveryAddress.postalCode || !deliveryAddress.country) {
    throw new HttpError(400, 'Complete delivery address is required');
  }
  
  // Get current prices for fees calculation
  const prices = await priceService.getLatestPrices();
  const buyPrice = prices.buyPrice;
  
  // Calculate fees (example: 3% of transaction value)
  const transactionValue = weightInGrams * buyPrice;
  const fees = transactionValue * 0.03;
  
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    // Create transaction record
    const transaction = await trx('transactions').insert({
      userId,
      type: 'REDEEM',
      weightInGrams,
      pricePerGram: buyPrice,
      fees,
      status: 'INITIATED',
      deliveryAddress: JSON.stringify(deliveryAddress),
      createdAt: new Date()
    }).returning('*');
    
    // Reduce gold balance
    await trx('user_wallets')
      .where({ userId })
      .decrement('goldBalance', weightInGrams)
      .increment('goldLockedForRedeem', weightInGrams);
    
    await trx.commit();
    
    // Send notification
    await notificationService.sendTransactionNotification(userId, {
      type: 'TRANSACTION_INITIATED',
      transactionId: transaction[0].id,
      weightInGrams,
      transactionType: 'REDEEM'
    });
    
    return transaction[0];
  } catch (error) {
    await trx.rollback();
    logger.error('Error creating redeem transaction', { error, userId });
    throw new HttpError(500, 'Failed to create redeem transaction');
  }
}

/**
 * Get transaction by ID
 * @param {string} transactionId - Transaction ID
 * @param {string} userId - User ID for authorization
 * @returns {Object} Transaction details
 */
async function getTransactionById(transactionId, userId) {
  const transaction = await db('transactions')
    .where({ id: transactionId })
    .first();
  
  if (!transaction) {
    throw new HttpError(404, 'Transaction not found');
  }
  
  if (transaction.userId !== userId) {
    throw new HttpError(403, 'Unauthorized to access this transaction');
  }
  
  return transaction;
}

/**
 * Get transaction status
 * @param {string} transactionId - Transaction ID
 * @param {string} userId - User ID for authorization
 * @returns {Object} Transaction status details
 */
async function getTransactionStatus(transactionId, userId) {
  const transaction = await getTransactionById(transactionId, userId);
  
  return {
    id: transaction.id,
    status: transaction.status,
    updatedAt: transaction.updatedAt,
    estimatedCompletionTime: transaction.estimatedCompletionTime
  };
}

/**
 * Verify payment for buy transaction
 * @param {string} userId - User ID
 * @param {string} transactionId - Transaction ID
 * @param {Object} paymentDetails - Payment verification details
 * @returns {Object} Updated transaction
 */
async function verifyBuyPayment(userId, transactionId, paymentDetails) {
  const transaction = await getTransactionById(transactionId, userId);
  
  if (transaction.type !== 'BUY') {
    throw new HttpError(400, 'Not a buy transaction');
  }
  
  if (transaction.status !== 'INITIATED') {
    throw new HttpError(400, `Transaction is already in ${transaction.status} state`);
  }
  
  // Here you would typically integrate with a payment gateway
  // to verify the payment was successful
  const paymentVerified = await verifyPaymentWithGateway(paymentDetails);
  
  if (!paymentVerified) {
    throw new HttpError(400, 'Payment verification failed');
  }
  
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    // Update transaction status
    const updatedTransaction = await trx('transactions')
      .where({ id: transactionId })
      .update({
        status: 'PROCESSING',
        paymentVerifiedAt: new Date(),
        updatedAt: new Date()
      })
      .returning('*');
    
    // Update user's gold balance
    await trx('user_wallets')
      .where({ userId })
      .increment('goldBalance', transaction.weightInGrams);
    
    await trx.commit();
    
    // Send notification
    await notificationService.sendTransactionNotification(userId, {
      type: 'PAYMENT_VERIFIED',
      transactionId,
      amount: transaction.amount,
      transactionType: 'BUY'
    });
    
    return updatedTransaction[0];
  } catch (error) {
    await trx.rollback();
    logger.error('Error verifying payment', { error, transactionId });
    throw new HttpError(500, 'Failed to verify payment');
  }
}

/**
 * Mock function to simulate payment verification with a payment gateway
 * In a real application, this would integrate with an actual payment gateway
 * @param {Object} paymentDetails - Payment details
 * @returns {boolean} Whether payment was verified
 */
async function verifyPaymentWithGateway(paymentDetails) {
  // Mock implementation - would be replaced with actual gateway integration
  logger.info('Verifying payment with gateway', { paymentDetails });
  return true;
}

/**
 * Cancel a transaction
 * @param {string} transactionId - Transaction ID
 * @param {string} userId - User ID for authorization
 * @returns {boolean} Success indicator
 */
async function cancelTransaction(transactionId, userId) {
  const transaction = await getTransactionById(transactionId, userId);
  
  if (!['INITIATED', 'PROCESSING'].includes(transaction.status)) {
    throw new HttpError(400, `Cannot cancel transaction in ${transaction.status} state`);
  }
  
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    // Update transaction status
    await trx('transactions')
      .where({ id: transactionId })
      .update({
        status: 'CANCELLED',
        updatedAt: new Date()
      });
    
    // Restore gold balance if needed
    if (transaction.type === 'SELL') {
      await trx('user_wallets')
        .where({ userId })
        .increment('goldBalance', transaction.weightInGrams)
        .decrement('goldLockedForSell', transaction.weightInGrams);
    } else if (transaction.type === 'REDEEM') {
      await trx('user_wallets')
        .where({ userId })
        .increment('goldBalance', transaction.weightInGrams)
        .decrement('goldLockedForRedeem', transaction.weightInGrams);
    }
    
    await trx.commit();
    
    // Send notification
    await notificationService.sendTransactionNotification(userId, {
      type: 'TRANSACTION_CANCELLED',
      transactionId,
      transactionType: transaction.type
    });
    
    return true;
  } catch (error) {
    await trx.rollback();
    logger.error('Error cancelling transaction', { error, transactionId });
    throw new HttpError(500, 'Failed to cancel transaction');
  }
}

module.exports = {
  getCurrentPrices,
  createBuyTransaction,
  createSellTransaction,
  createRedeemTransaction,
  getTransactionById,
  getTransactionStatus,
  verifyBuyPayment,
  cancelTransaction
}; 