const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Vault = sequelize.define('Vault', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  totalGoldInGrams: {
    type: DataTypes.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0
  },
  allocatedGoldInGrams: {
    type: DataTypes.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'ACTIVE'
  }
}, {
  timestamps: true
});

// Instance methods
Vault.prototype.getAvailableGold = function() {
  return Math.max(0, parseFloat(this.totalGoldInGrams) - parseFloat(this.allocatedGoldInGrams));
};

module.exports = Vault; 