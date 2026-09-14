const User = require('./User');
const Wallet = require('./Wallet');
const BankDetail = require('./BankDetail');
const KYC = require('./KYC');
const GoldPrice = require('./GoldPrice');
const Product = require('./Product');
const Transaction = require('./Transaction');
const BuyTransaction = require('./BuyTransaction');
const SellTransaction = require('./SellTransaction');
const RedeemTransaction = require('./RedeemTransaction');
const Vault = require('./Vault');
const EmailVerification = require('./EmailVerification');
const UserDetails = require('./UserDetails');
const UserAddress = require('./UserAddress');
const Vendor = require('./Vendor');
const BuyGoldRate = require('./BuyGoldRate');
const SellGoldRate = require('./SellGoldRate');
const CompanyVault = require('./CompanyVault');
const VaultTransaction = require('./VaultTransaction');
const { sequelize } = require('../config/database');

// Define relationships between models

// User - Wallet (1:1)
User.hasOne(Wallet, { foreignKey: 'userId', as: 'wallet' });
Wallet.belongsTo(User, { foreignKey: 'userId' });

// User - BankDetail (1:N)
User.hasMany(BankDetail, { foreignKey: 'userId', as: 'bankDetails' });
BankDetail.belongsTo(User, { foreignKey: 'userId' });

// User - KYC (1:1)
User.hasOne(KYC, { foreignKey: 'userId', as: 'kyc' });
KYC.belongsTo(User, { foreignKey: 'userId' });

// User - Transaction (1:N)
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

// Transaction - BuyTransaction (1:1)
Transaction.hasOne(BuyTransaction, { foreignKey: 'transactionId', as: 'buyDetails' });
BuyTransaction.belongsTo(Transaction, { foreignKey: 'transactionId' });

// Transaction - SellTransaction (1:1)
Transaction.hasOne(SellTransaction, { foreignKey: 'transactionId', as: 'sellDetails' });
SellTransaction.belongsTo(Transaction, { foreignKey: 'transactionId' });

// Transaction - RedeemTransaction (1:1)
Transaction.hasOne(RedeemTransaction, { foreignKey: 'transactionId', as: 'redeemDetails' });
RedeemTransaction.belongsTo(Transaction, { foreignKey: 'transactionId' });

// BankDetail - SellTransaction (1:N)
BankDetail.hasMany(SellTransaction, { foreignKey: 'bankDetailId', as: 'sellTransactions' });
SellTransaction.belongsTo(BankDetail, { foreignKey: 'bankDetailId' });

// Product - RedeemTransaction (1:N)
Product.hasMany(RedeemTransaction, { foreignKey: 'productId', as: 'redeemTransactions' });
RedeemTransaction.belongsTo(Product, { foreignKey: 'productId' });

// Admin user who updated gold price
User.hasMany(GoldPrice, { foreignKey: 'updatedBy', as: 'updatedPrices' });
GoldPrice.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

// User - EmailVerification (1:N)
User.hasMany(EmailVerification, { foreignKey: 'userId', as: 'emailVerifications' });
EmailVerification.belongsTo(User, { foreignKey: 'userId' });

// User - UserDetails (1:1)
User.hasOne(UserDetails, { foreignKey: 'userId', as: 'details' });
UserDetails.belongsTo(User, { foreignKey: 'userId' });

// User - UserAddress (1:N)
User.hasMany(UserAddress, { foreignKey: 'userId', as: 'addresses' });
UserAddress.belongsTo(User, { foreignKey: 'userId' });

// Vendor - User (1:N)
Vendor.hasMany(User, { foreignKey: 'vendorId', as: 'users' });
User.belongsTo(Vendor, { foreignKey: 'vendorId' });

// Vendor - UserDetails (1:N)
Vendor.hasMany(UserDetails, { foreignKey: 'vendorId', as: 'userDetails' });
UserDetails.belongsTo(Vendor, { foreignKey: 'vendorId' });

// User - BuyGoldRate (1:N)
User.hasMany(BuyGoldRate, { foreignKey: 'updatedBy', as: 'updatedBuyRates' });
BuyGoldRate.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

// User - SellGoldRate (1:N)
User.hasMany(SellGoldRate, { foreignKey: 'updatedBy', as: 'updatedSellRates' });
SellGoldRate.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

// Vendor - BuyGoldRate (1:N)
Vendor.hasMany(BuyGoldRate, { foreignKey: 'vendorId', as: 'buyRates' });
BuyGoldRate.belongsTo(Vendor, { foreignKey: 'vendorId' });

// Vendor - SellGoldRate (1:N)
Vendor.hasMany(SellGoldRate, { foreignKey: 'vendorId', as: 'sellRates' });
SellGoldRate.belongsTo(Vendor, { foreignKey: 'vendorId' });

// Vendor - CompanyVault (1:1)
Vendor.hasOne(CompanyVault, { foreignKey: 'vendorId', as: 'vault' });
CompanyVault.belongsTo(Vendor, { foreignKey: 'vendorId' });

// User - CompanyVault (1:N)
User.hasMany(CompanyVault, { foreignKey: 'lastUpdatedBy', as: 'vaultsUpdated' });
CompanyVault.belongsTo(User, { foreignKey: 'lastUpdatedBy', as: 'updatedByUser' });

// User - VaultTransaction (1:N)
User.hasMany(VaultTransaction, { foreignKey: 'performedBy', as: 'vaultTransactions' });
VaultTransaction.belongsTo(User, { foreignKey: 'performedBy', as: 'performedByUser' });

// Vendor - VaultTransaction (1:N)
Vendor.hasMany(VaultTransaction, { foreignKey: 'vendorId', as: 'vaultTransactions' });
VaultTransaction.belongsTo(Vendor, { foreignKey: 'vendorId' });

// Transaction - VaultTransaction (1:1)
Transaction.hasOne(VaultTransaction, { foreignKey: 'relatedTransactionId', as: 'vaultTransaction' });
VaultTransaction.belongsTo(Transaction, { foreignKey: 'relatedTransactionId', as: 'relatedTransaction' });

// Function to sync all models with the database
const syncModels = async (options = {}) => {
  try {
    await sequelize.sync(options);
    console.log('All models were synchronized successfully.');
    return true;
  } catch (error) {
    console.error('Error synchronizing models:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  User,
  Wallet,
  BankDetail,
  KYC,
  GoldPrice,
  Product,
  Transaction,
  BuyTransaction,
  SellTransaction,
  RedeemTransaction,
  Vault,
  EmailVerification,
  UserDetails,
  UserAddress,
  Vendor,
  BuyGoldRate,
  SellGoldRate,
  CompanyVault,
  VaultTransaction,
  syncModels
}; 