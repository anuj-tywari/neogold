const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  goldBalanceInGrams: {
    type: DataTypes.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  lockedGoldInGrams: {
    type: DataTypes.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  walletStatus: {
    type: DataTypes.ENUM('ACTIVE', 'SUSPENDED', 'LOCKED'),
    defaultValue: 'ACTIVE'
  },
  statusUpdatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  statusUpdatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  statusUpdateReason: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true, // Enable soft deletes
  indexes: [
    {
      unique: true,
      fields: ['userId']
    }
  ]
});

/**
 * Get the available gold balance (total - locked)
 */
Wallet.prototype.getAvailableGold = function() {
  return Math.max(0, parseFloat(this.goldBalanceInGrams) - parseFloat(this.lockedGoldInGrams));
};

/**
 * Lock some gold for a pending transaction
 * @param {Number} amountInGrams - Amount of gold to lock
 */
Wallet.prototype.lockGold = async function(amountInGrams) {
  const availableGold = this.getAvailableGold();
  if (amountInGrams > availableGold) {
    throw new Error('Insufficient gold balance');
  }
  
  this.lockedGoldInGrams = parseFloat(this.lockedGoldInGrams) + parseFloat(amountInGrams);
  return await this.save();
};

/**
 * Unlock previously locked gold
 * @param {Number} amountInGrams - Amount of gold to unlock
 */
Wallet.prototype.unlockGold = async function(amountInGrams) {
  if (amountInGrams > parseFloat(this.lockedGoldInGrams)) {
    throw new Error('Cannot unlock more gold than is locked');
  }
  
  this.lockedGoldInGrams = parseFloat(this.lockedGoldInGrams) - parseFloat(amountInGrams);
  return await this.save();
};

/**
 * Add gold to the wallet
 * @param {Number} amountInGrams - Amount of gold to add
 */
Wallet.prototype.addGold = async function(amountInGrams) {
  this.goldBalanceInGrams = parseFloat(this.goldBalanceInGrams) + parseFloat(amountInGrams);
  return await this.save();
};

/**
 * Remove gold from the wallet
 * @param {Number} amountInGrams - Amount of gold to remove
 */
Wallet.prototype.removeGold = async function(amountInGrams) {
  const availableGold = this.getAvailableGold();
  if (amountInGrams > availableGold) {
    throw new Error('Insufficient available gold balance');
  }
  
  this.goldBalanceInGrams = parseFloat(this.goldBalanceInGrams) - parseFloat(amountInGrams);
  return await this.save();
};

module.exports = Wallet; 