const { User, Wallet, BankDetail, KYC, Transaction } = require('../models');
const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const { sequelize } = require('../config/database');

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Object} User profile
 */
const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'role', 'isEmailVerified', 'isPhoneVerified', 'kycStatus', 'createdAt']
  });
  
  if (!user) {
    throw new HttpError('User not found', 404);
  }
  
  return user;
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Updated profile data
 * @returns {Object} Updated user profile
 */
const updateUserProfile = async (userId, profileData) => {
  const user = await User.findByPk(userId);
  
  if (!user) {
    throw new HttpError('User not found', 404);
  }
  
  // Only allow certain fields to be updated
  const allowedUpdates = ['firstName', 'lastName', 'phone', 'address'];
  const updates = {};
  
  Object.keys(profileData).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = profileData[key];
    }
  });
  
  await user.update(updates);
  
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    updatedAt: user.updatedAt
  };
};

/**
 * Get user's bank details
 * @param {string} userId - User ID
 * @returns {Array} Bank details
 */
const getUserBankDetails = async (userId) => {
  const bankDetails = await BankDetail.findAll({
    where: { userId },
    attributes: ['id', 'accountHolderName', 'lastFourDigits', 'ifscCode', 'bankName', 'accountType', 'isVerified', 'isPrimary', 'verificationStatus', 'createdAt', 'updatedAt']
  });
  
  return bankDetails;
};

/**
 * Create a new bank detail for user
 * @param {string} userId - User ID
 * @param {Object} bankData - Bank detail data
 * @returns {Object} Created bank detail
 */
const createBankDetail = async (userId) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Check user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    
    // Check if user already has bank details and if this is the first one
    const existingBankDetails = await BankDetail.count({ 
      where: { userId },
      transaction
    });
    
    // Set this as primary if it's the first bank detail
    const isPrimary = existingBankDetails === 0;
    
    // Create new bank detail
    const bankDetail = await BankDetail.create({
      ...bankData,
      userId,
      isPrimary
    }, { transaction });
    
    await transaction.commit();
    
    // Return without sensitive data
    return {
      id: bankDetail.id,
      accountHolderName: bankDetail.accountHolderName,
      lastFourDigits: bankDetail.lastFourDigits,
      ifscCode: bankDetail.ifscCode,
      bankName: bankDetail.bankName,
      accountType: bankDetail.accountType,
      isVerified: bankDetail.isVerified,
      isPrimary: bankDetail.isPrimary,
      verificationStatus: bankDetail.verificationStatus,
      createdAt: bankDetail.createdAt
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Update a bank detail
 * @param {string} userId - User ID
 * @param {string} bankDetailId - Bank detail ID
 * @param {Object} bankData - Updated bank data
 * @returns {Object} Updated bank detail
 */
const updateBankDetail = async (userId, bankDetailId, bankData) => {
  const bankDetail = await BankDetail.findOne({
    where: { id: bankDetailId, userId }
  });
  
  if (!bankDetail) {
    throw new HttpError('Bank detail not found', 404);
  }
  
  // Only allow certain fields to be updated
  const allowedUpdates = ['accountHolderName', 'ifscCode', 'bankName', 'accountType'];
  const updates = {};
  
  Object.keys(bankData).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = bankData[key];
    }
  });
  
  // If account number is updated, we should handle it differently because of encryption
  if (bankData.accountNumber) {
    // This will trigger the encryption in the model
    bankDetail.accountNumber = bankData.accountNumber;
  }
  
  await bankDetail.update(updates);
  
  return {
    id: bankDetail.id,
    accountHolderName: bankDetail.accountHolderName,
    lastFourDigits: bankDetail.lastFourDigits,
    ifscCode: bankDetail.ifscCode,
    bankName: bankDetail.bankName,
    accountType: bankDetail.accountType,
    isVerified: bankDetail.isVerified,
    isPrimary: bankDetail.isPrimary,
    verificationStatus: bankDetail.verificationStatus,
    updatedAt: bankDetail.updatedAt
  };
};

/**
 * Delete a bank detail
 * @param {string} userId - User ID
 * @param {string} bankDetailId - Bank detail ID
 */
const deleteBankDetail = async (userId, bankDetailId) => {
  const transaction = await sequelize.transaction();
  
  try {
    const bankDetail = await BankDetail.findOne({
      where: { id: bankDetailId, userId },
      transaction
    });
    
    if (!bankDetail) {
      throw new HttpError('Bank detail not found', 404);
    }
    
    // Check if this is primary bank detail
    if (bankDetail.isPrimary) {
      // Find another bank detail to set as primary
      const anotherBankDetail = await BankDetail.findOne({
        where: { 
          userId, 
          id: { [sequelize.Sequelize.Op.ne]: bankDetailId } 
        },
        transaction
      });
      
      if (anotherBankDetail) {
        await anotherBankDetail.update({ isPrimary: true }, { transaction });
      }
    }
    
    await bankDetail.destroy({ transaction });
    
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Set a bank detail as primary
 * @param {string} userId - User ID
 * @param {string} bankDetailId - Bank detail ID
 */
const setPrimaryBankDetail = async (userId, bankDetailId) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Check if bank detail exists and belongs to user
    const bankDetail = await BankDetail.findOne({
      where: { id: bankDetailId, userId },
      transaction
    });
    
    if (!bankDetail) {
      throw new HttpError('Bank detail not found', 404);
    }
    
    // If already primary, nothing to do
    if (bankDetail.isPrimary) {
      await transaction.commit();
      return;
    }
    
    // Unset primary for all user's bank details
    await BankDetail.update(
      { isPrimary: false },
      { 
        where: { userId },
        transaction
      }
    );
    
    // Set this one as primary
    await bankDetail.update({ isPrimary: true }, { transaction });
    
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Get user's KYC details
 * @param {string} userId - User ID
 * @returns {Object} KYC details
 */
const getUserKycDetails = async (userId) => {
  const kycDetails = await KYC.findOne({
    where: { userId },
    attributes: ['id', 'idType', 'idNumber', 'dateOfBirth', 'nationality', 'gender', 'status', 'submissionDate', 'verificationDate']
  });
  
  if (!kycDetails) {
    return { status: 'NOT_SUBMITTED' };
  }
  
  return kycDetails;
};

/**
 * Submit KYC details
 * @param {string} userId - User ID
 * @param {Object} kycData - KYC data
 * @returns {Object} KYC details
 */
const submitKyc = async (userId, kycData) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Check user exists
    const user = await User.findByPk(userId, { transaction });
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    
    // Check if KYC already submitted
    let kyc = await KYC.findOne({ 
      where: { userId },
      transaction
    });
    
    if (kyc) {
      // Only allow resubmission if status is REJECTED
      if (kyc.status !== 'REJECTED') {
        throw new HttpError('KYC already submitted', 400);
      }
      
      // Update existing KYC
      await kyc.update({
        ...kycData,
        status: 'PENDING',
        submissionDate: new Date(),
        rejectionReason: null
      }, { transaction });
    } else {
      // Create new KYC
      kyc = await KYC.create({
        ...kycData,
        userId,
        status: 'PENDING',
        submissionDate: new Date()
      }, { transaction });
    }
    
    // Update user KYC status
    await user.update({ kycStatus: 'PENDING' }, { transaction });
    
    await transaction.commit();
    
    return {
      id: kyc.id,
      idType: kyc.idType,
      idNumber: kyc.idNumber,
      dateOfBirth: kyc.dateOfBirth,
      nationality: kyc.nationality,
      gender: kyc.gender,
      status: kyc.status,
      submissionDate: kyc.submissionDate
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

/**
 * Get user's wallet
 * @param {string} userId - User ID
 * @returns {Object} Wallet with transaction summary
 */
const getUserWallet = async (userId) => {
  // Get wallet
  const wallet = await Wallet.findOne({
    where: { userId },
    attributes: ['id', 'goldBalanceInGrams', 'lockedGoldInGrams', 'walletStatus', 'statusUpdatedAt']
  });
  
  if (!wallet) {
    throw new HttpError('Wallet not found', 404);
  }
  
  // Calculate available gold
  const availableGold = wallet.getAvailableGold();
  
  // Get transaction summary
  const buyTotal = await Transaction.sum('weightInGrams', {
    where: {
      userId,
      transactionType: 'BUY',
      status: 'COMPLETED'
    }
  }) || 0;
  
  const sellTotal = await Transaction.sum('weightInGrams', {
    where: {
      userId,
      transactionType: 'SELL',
      status: 'COMPLETED'
    }
  }) || 0;
  
  const redeemTotal = await Transaction.sum('weightInGrams', {
    where: {
      userId,
      transactionType: 'REDEEM',
      status: 'COMPLETED'
    }
  }) || 0;
  
  return {
    id: wallet.id,
    goldBalanceInGrams: parseFloat(wallet.goldBalanceInGrams),
    lockedGoldInGrams: parseFloat(wallet.lockedGoldInGrams),
    availableGoldInGrams: parseFloat(availableGold),
    walletStatus: wallet.walletStatus,
    summary: {
      totalBought: parseFloat(buyTotal),
      totalSold: parseFloat(sellTotal),
      totalRedeemed: parseFloat(redeemTotal)
    }
  };
};

/**
 * Get user's transactions
 * @param {string} userId - User ID
 * @param {Object} options - Filtering and pagination options
 * @returns {Object} Transactions with pagination
 */
const getUserTransactions = async (userId, options) => {
  const { type, status, page = 1, limit = 10 } = options;
  
  // Build where clause
  const where = { userId };
  
  if (type) {
    where.transactionType = type;
  }
  
  if (status) {
    where.status = status;
  }
  
  // Calculate offset
  const offset = (page - 1) * limit;
  
  // Get total count
  const totalCount = await Transaction.count({ where });
  
  // Get transactions
  const transactions = await Transaction.findAll({
    where,
    attributes: [
      'id', 'transactionType', 'status', 'amount', 'weightInGrams', 
      'pricePerGram', 'fees', 'taxes', 'totalAmount', 'paymentMethod', 
      'paymentStatus', 'reference', 'createdAt', 'completedAt'
    ],
    order: [['createdAt', 'DESC']],
    limit,
    offset
  });
  
  return {
    transactions,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
  };
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserBankDetails,
  createBankDetail,
  updateBankDetail,
  deleteBankDetail,
  setPrimaryBankDetail,
  getUserKycDetails,
  submitKyc,
  getUserWallet,
  getUserTransactions
}; 