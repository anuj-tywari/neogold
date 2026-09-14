const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserDetails = sequelize.define('UserDetails', {
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
    },
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  phoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  panNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    }
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^\d{12}$/
    }
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  preferredLanguage: {
    type: DataTypes.STRING,
    defaultValue: 'en'
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  annualIncome: {
    type: DataTypes.ENUM('BELOW_5L', '5L_10L', '10L_25L', 'ABOVE_25L'),
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
  timestamps: true,
  paranoid: true // Soft delete
});

module.exports = UserDetails; 