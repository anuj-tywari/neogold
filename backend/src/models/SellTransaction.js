const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SellTransaction = sequelize.define('SellTransaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  transactionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Transactions',
      key: 'id'
    }
  },
  bankDetailId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'BankDetails',
      key: 'id'
    }
  },
  accountHolderName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  bankName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastFourDigits: {
    type: DataTypes.STRING(4),
    allowNull: false
  },
  paymentReference: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  paymentProcessedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  additionalNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  taxDeducted: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  processingFee: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: true,
  paranoid: true, // Enable soft deletes
  indexes: [
    {
      fields: ['transactionId']
    },
    {
      fields: ['bankDetailId']
    },
    {
      fields: ['paymentReference']
    }
  ]
});

module.exports = SellTransaction; 