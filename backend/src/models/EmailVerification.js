const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const crypto = require('crypto');

class EmailVerification extends Model {
  /**
   * Generate a verification token
   * @returns {string} - The generated token
   */
  static generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}

EmailVerification.init({
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('VERIFICATION', 'PASSWORD_RESET'),
    defaultValue: 'VERIFICATION',
    allowNull: false
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  }
}, {
  sequelize,
  modelName: 'EmailVerification',
  tableName: 'email_verifications',
  timestamps: true,
  paranoid: true, // enables soft delete
  indexes: [
    {
      unique: true,
      fields: ['token']
    },
    {
      fields: ['userId']
    },
    {
      fields: ['email']
    },
    {
      fields: ['expiresAt']
    }
  ]
});

module.exports = EmailVerification; 