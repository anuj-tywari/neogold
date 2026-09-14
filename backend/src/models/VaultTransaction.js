const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VaultTransaction = sequelize.define('VaultTransaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  transactionType: {
    type: DataTypes.ENUM('PHYSICAL_ADDITION', 'PHYSICAL_REMOVAL', 'CUSTOMER_SELL', 'CUSTOMER_BUY', 'CUSTOMER_REDEEM', 'ADJUSTMENT'),
    allowNull: false
  },
  weightInGrams: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  purity: {
    type: DataTypes.ENUM('24K', '22K', '18K'),
    defaultValue: '24K'
  },
  receiptNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  supplierName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  purchasePrice: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  relatedTransactionId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Transactions',
      key: 'id'
    }
  },
  performedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  receiptImageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Vendors',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = VaultTransaction; 