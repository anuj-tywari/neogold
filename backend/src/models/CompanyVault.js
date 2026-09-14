const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CompanyVault = sequelize.define('CompanyVault', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  totalGoldInGrams: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  customerOwnedGoldInGrams: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  companyOwnedGoldInGrams: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  lastUpdatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
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

module.exports = CompanyVault; 