const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN', 'VENDOR_ADMIN', 'VENDOR_STAFF'),
    defaultValue: 'USER'
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'),
    defaultValue: 'PENDING'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPhoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  emailVerificationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  passwordChangedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  kycStatus: {
    type: DataTypes.ENUM('NOT_SUBMITTED', 'PENDING', 'VERIFIED', 'REJECTED'),
    defaultValue: 'NOT_SUBMITTED'
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Vendors',
      key: 'id'
    }
  },
  vendorPermissions: {
    type: DataTypes.JSON,
    allowNull: true
  },
  apiKeyEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  apiSecret: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true, // Enable soft deletes
  hooks: {
    // Hash password before saving to database
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
        user.passwordChangedAt = new Date();
      }
    }
  }
});

// Instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create password reset token
User.prototype.createPasswordResetToken = function() {
  const resetToken = require('crypto').randomBytes(32).toString('hex');
  this.passwordResetToken = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  return resetToken;
};

User.prototype.generateAuthToken = function() {
  const payload = {
    id: this.id,
    email: this.email,
    role: this.role,
    vendorId: this.vendorId
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

User.prototype.generateRefreshToken = function() {
  const payload = {
    id: this.id,
    tokenVersion: Date.now()
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

User.prototype.generateApiCredentials = async function() {
  const apiKey = require('crypto').randomBytes(16).toString('hex');
  const apiSecret = require('crypto').randomBytes(32).toString('hex');
  
  // Hash the API secret before saving
  const hashedApiSecret = await bcrypt.hash(apiSecret, 10);
  
  // Update user with API credentials
  await this.update({
    apiKey,
    apiSecret: hashedApiSecret,
    apiKeyEnabled: true
  });
  
  // Return unhashed credentials to show to user (only time they'll see the secret)
  return {
    apiKey,
    apiSecret
  };
};

User.prototype.verifyApiSecret = async function(candidateSecret) {
  return await bcrypt.compare(candidateSecret, this.apiSecret);
};

module.exports = User; 