const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SellGoldRate = sequelize.define('SellGoldRate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ratePerGram: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  purity: {
    type: DataTypes.ENUM('24K', '22K', '18K'),
    defaultValue: '24K'
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  effectiveFrom: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  effectiveTo: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rateInUSD: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  conversionRate: {
    type: DataTypes.FLOAT,
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

module.exports = SellGoldRate; 