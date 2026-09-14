const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GoldPrice = sequelize.define('GoldPrice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  buyPricePerGram: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  sellPricePerGram: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'SYSTEM'
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: 'INR'
  },
  purity: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 99.9, // 24K gold is 99.9% pure
    validate: {
      min: 0,
      max: 100
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  updatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['timestamp']
    },
    {
      fields: ['isActive']
    }
  ]
});

/**
 * Static method to get the current active gold price
 */
GoldPrice.getCurrentPrice = async function() {
  return await this.findOne({
    where: {
      isActive: true
    },
    order: [['timestamp', 'DESC']]
  });
};

/**
 * Static method to get historical gold prices
 * @param {Date} startDate - Start date for the price history
 * @param {Date} endDate - End date for the price history
 */
GoldPrice.getHistoricalPrices = async function(startDate, endDate) {
  return await this.findAll({
    where: {
      timestamp: {
        [sequelize.Sequelize.Op.between]: [startDate, endDate]
      }
    },
    order: [['timestamp', 'ASC']]
  });
};

module.exports = GoldPrice; 