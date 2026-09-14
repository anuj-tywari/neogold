const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const CryptoJS = require('crypto-js');

const BankDetail = sequelize.define('BankDetail', {
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
  accountHolderName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Encrypt sensitive bank data
      const encrypted = CryptoJS.AES.encrypt(
        value,
        process.env.ENCRYPTION_KEY
      ).toString();
      this.setDataValue('accountNumber', encrypted);
    },
    get() {
      // Decrypt when accessed
      const encrypted = this.getDataValue('accountNumber');
      if (encrypted) {
        const decrypted = CryptoJS.AES.decrypt(
          encrypted,
          process.env.ENCRYPTION_KEY
        ).toString(CryptoJS.enc.Utf8);
        return decrypted;
      }
      return null;
    }
  },
  // Store last 4 digits in plain text for display purposes
  lastFourDigits: {
    type: DataTypes.STRING(4),
    allowNull: false
  },
  ifscCode: {
    type: DataTypes.STRING(11),
    allowNull: false,
    validate: {
      is: /^[A-Z]{4}0[A-Z0-9]{6}$/
    }
  },
  bankName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  accountType: {
    type: DataTypes.ENUM('SAVINGS', 'CURRENT'),
    defaultValue: 'SAVINGS'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPrimary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationStatus: {
    type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECTED'),
    defaultValue: 'PENDING'
  },
  rejectionReason: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true, // Enable soft deletes
  hooks: {
    beforeCreate: (bankDetail) => {
      // Store last 4 digits of the account number
      if (bankDetail.accountNumber) {
        const accountNumber = bankDetail.accountNumber;
        bankDetail.lastFourDigits = accountNumber.slice(-4);
      }
    }
  }
});

// Get masked account number for display (e.g. XXXX1234)
BankDetail.prototype.getMaskedAccountNumber = function() {
  return `XXXX${this.lastFourDigits}`;
};

module.exports = BankDetail; 