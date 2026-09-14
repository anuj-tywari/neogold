const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  weightInGrams: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    validate: {
      min: 0.1
    }
  },
  purity: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 99.9, // 24K gold is 99.9% pure
    validate: {
      min: 90,
      max: 100
    }
  },
  type: {
    type: DataTypes.ENUM('COIN', 'BAR', 'JEWELRY'),
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  makingCharges: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  deliveryCharges: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  stockAvailable: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  minimumOrderQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  maximumOrderQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  }
}, {
  timestamps: true,
  paranoid: true, // Enable soft deletes
  indexes: [
    {
      fields: ['type']
    },
    {
      fields: ['isActive']
    },
    {
      fields: ['weightInGrams']
    }
  ]
});

/**
 * Calculate the total cost of the product based on current gold price
 * @param {Object} goldPrice - Current gold price object
 * @param {Number} quantity - Quantity of the product
 */
Product.prototype.calculateTotalCost = function(goldPrice, quantity = 1) {
  // Calculate base gold cost
  const goldCost = parseFloat(this.weightInGrams) * parseFloat(goldPrice.buyPricePerGram);
  
  // Add making charges
  const totalMakingCharges = parseFloat(this.makingCharges) * quantity;
  
  // Add delivery charges (typically only charged once regardless of quantity)
  const totalDeliveryCharges = parseFloat(this.deliveryCharges);
  
  return (goldCost * quantity) + totalMakingCharges + totalDeliveryCharges;
};

module.exports = Product; 