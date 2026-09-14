const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RedeemTransaction = sequelize.define('RedeemTransaction', {
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
  productId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  deliveryAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contactPhone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  deliveryInstructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  trackingNumber: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  courierCompany: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  dispatchDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  estimatedDeliveryDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deliveryStatus: {
    type: DataTypes.ENUM('PROCESSING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'FAILED'),
    defaultValue: 'PROCESSING'
  },
  deliveryNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  insuranceAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  makingCharges: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  deliveryCharges: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  gstAmount: {
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
      fields: ['productId']
    },
    {
      fields: ['trackingNumber']
    },
    {
      fields: ['deliveryStatus']
    }
  ]
});

module.exports = RedeemTransaction; 