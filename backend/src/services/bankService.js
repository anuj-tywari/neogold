const { BankDetail, Transaction } = require('../models');
const { Op } = require('sequelize');
const { HttpError } = require('../middleware/errorHandler');
const axios = require('axios');
const logger = require('../utils/logger');

/**
 * Get all bank details for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Bank details
 */
const getUserBankDetails = async (userId) => {
  try {
    const bankDetails = await BankDetail.findAll({
      where: { userId },
      order: [
        ['isPrimary', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });
    
    return bankDetails;
  } catch (error) {
    logger.error(`Error fetching bank details for user ${userId}: ${error.message}`);
    throw new HttpError(500, 'Failed to retrieve bank accounts');
  }
};

/**
 * Get bank detail by ID
 * @param {string} id - Bank detail ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Bank detail
 */
const getBankDetailById = async (id, userId) => {
  try {
    const bankDetail = await BankDetail.findOne({
      where: { 
        id,
        userId 
      }
    });
    
    return bankDetail;
  } catch (error) {
    logger.error(`Error fetching bank detail ${id} for user ${userId}: ${error.message}`);
    throw new HttpError(500, 'Failed to retrieve bank account details');
  }
};

/**
 * Add a new bank detail
 * @param {string} userId - User ID
 * @param {Object} bankDetailData - Bank detail data
 * @returns {Promise<Object>} - Created bank detail
 */
const addBankDetail = async (userId, bankDetailData) => {
  try {
    // Check if this is the first bank account for this user
    const existingAccounts = await BankDetail.count({ where: { userId } });
    const isPrimary = existingAccounts === 0 ? true : bankDetailData.isPrimary;
    
    // If this account is being set as primary, unset any existing primary
    if (isPrimary) {
      await BankDetail.update(
        { isPrimary: false },
        { where: { userId, isPrimary: true } }
      );
    }
    
    // Create the bank detail
    const bankDetail = await BankDetail.create({
      ...bankDetailData,
      userId,
      isPrimary
    });
    
    return bankDetail;
  } catch (error) {
    logger.error(`Error adding bank detail for user ${userId}: ${error.message}`);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpError(400, 'This account number is already registered');
    }
    
    throw new HttpError(500, 'Failed to add bank account');
  }
};

/**
 * Update a bank detail
 * @param {string} id - Bank detail ID
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} - Updated bank detail
 */
const updateBankDetail = async (id, userId, updates) => {
  try {
    // Handle setting as primary
    if (updates.isPrimary) {
      await BankDetail.update(
        { isPrimary: false },
        { where: { userId, isPrimary: true } }
      );
    }
    
    // Update the bank detail
    await BankDetail.update(updates, {
      where: { id, userId }
    });
    
    // Fetch and return the updated bank detail
    const updatedBankDetail = await BankDetail.findOne({
      where: { id, userId }
    });
    
    return updatedBankDetail;
  } catch (error) {
    logger.error(`Error updating bank detail ${id} for user ${userId}: ${error.message}`);
    throw new HttpError(500, 'Failed to update bank account');
  }
};

/**
 * Delete a bank detail
 * @param {string} id - Bank detail ID
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} - Success status
 */
const deleteBankDetail = async (id, userId) => {
  try {
    const bankDetail = await BankDetail.findOne({
      where: { id, userId }
    });
    
    if (!bankDetail) {
      return false;
    }
    
    const wasPrimary = bankDetail.isPrimary;
    
    // Delete the bank detail
    await BankDetail.destroy({
      where: { id, userId }
    });
    
    // If this was the primary account, set another one as primary if available
    if (wasPrimary) {
      const anotherAccount = await BankDetail.findOne({
        where: { userId },
        order: [['createdAt', 'DESC']]
      });
      
      if (anotherAccount) {
        await BankDetail.update(
          { isPrimary: true },
          { where: { id: anotherAccount.id } }
        );
      }
    }
    
    return true;
  } catch (error) {
    logger.error(`Error deleting bank detail ${id} for user ${userId}: ${error.message}`);
    throw new HttpError(500, 'Failed to delete bank account');
  }
};

/**
 * Check if there are pending transactions for a bank detail
 * @param {string} bankDetailId - Bank detail ID
 * @returns {Promise<boolean>} - True if there are pending transactions
 */
const hasPendingTransactions = async (bankDetailId) => {
  try {
    const pendingTransactionCount = await Transaction.count({
      where: {
        bankDetailId,
        status: {
          [Op.in]: ['PENDING', 'PROCESSING']
        }
      }
    });
    
    return pendingTransactionCount > 0;
  } catch (error) {
    logger.error(`Error checking pending transactions for bank detail ${bankDetailId}: ${error.message}`);
    throw new HttpError(500, 'Failed to check pending transactions');
  }
};

/**
 * Set a bank detail as primary
 * @param {string} id - Bank detail ID
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} - Success status
 */
const setPrimaryBankDetail = async (id, userId) => {
  try {
    // Unset current primary
    await BankDetail.update(
      { isPrimary: false },
      { where: { userId, isPrimary: true } }
    );
    
    // Set new primary
    await BankDetail.update(
      { isPrimary: true },
      { where: { id, userId } }
    );
    
    return true;
  } catch (error) {
    logger.error(`Error setting bank detail ${id} as primary for user ${userId}: ${error.message}`);
    throw new HttpError(500, 'Failed to set bank account as primary');
  }
};

/**
 * Verify IFSC code and get bank information
 * @param {string} code - IFSC code
 * @returns {Promise<Object>} - Bank information
 */
const verifyIfscCode = async (code) => {
  try {
    // Use razorpay's IFSC API to verify and get details
    const response = await axios.get(`https://ifsc.razorpay.com/${code}`);
    
    if (response.status === 200 && response.data) {
      return {
        bankName: response.data.BANK,
        branch: response.data.BRANCH,
        address: response.data.ADDRESS,
        city: response.data.CITY,
        state: response.data.STATE,
        valid: true
      };
    } else {
      throw new HttpError(400, 'Invalid IFSC code');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new HttpError(400, 'Invalid IFSC code');
    }
    
    logger.error(`Error verifying IFSC code ${code}: ${error.message}`);
    throw new HttpError(500, 'Failed to verify IFSC code');
  }
};

module.exports = {
  getUserBankDetails,
  getBankDetailById,
  addBankDetail,
  updateBankDetail,
  deleteBankDetail,
  hasPendingTransactions,
  setPrimaryBankDetail,
  verifyIfscCode
}; 