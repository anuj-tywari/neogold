const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KYC = sequelize.define('KYC', {
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
    }
  },
  idType: {
    type: DataTypes.ENUM('AADHAR', 'PAN', 'PASSPORT', 'DRIVING_LICENSE', 'VOTER_ID'),
    allowNull: false
  },
  idNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idFrontImagePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idBackImagePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  selfieImagePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Indian'
  },
  gender: {
    type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECTED'),
    defaultValue: 'PENDING'
  },
  rejectionReason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  verificationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  verifiedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  submissionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  paranoid: true, // Enable soft deletes
  indexes: [
    {
      unique: true,
      fields: ['userId']
    },
    {
      fields: ['idType', 'idNumber']
    }
  ]
});

module.exports = KYC; 