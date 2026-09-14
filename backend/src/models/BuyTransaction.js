const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BuyTransaction = sequelize.define('BuyTransaction', {
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
  paymentGateway: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  paymentDetails: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  upiId: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  cardLastFourDigits: {
    type: DataTypes.STRING(4),
    allowNull: true
  },
  paymentTimestamp: {
    type: DataTypes.DATE,
    allowNull: true
  },
  invoiceNumber: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  orderReference: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  promoCode: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  discountAmount: {
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
      fields: ['paymentGateway']
    },
    {
      fields: ['invoiceNumber']
    }
  ]
});

module.exports = BuyTransaction; 