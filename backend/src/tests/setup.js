// Force environment to be test
process.env.NODE_ENV = 'test';

// Load environment variables from .env file
require('dotenv').config();

// Setup test-specific environment variables
process.env.DB_NAME = 'neogold_test';
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_token_secret';
process.env.ENCRYPTION_KEY = 'test_encryption_key_for_sensitive_data';
process.env.ENCRYPTION_IV = 'test_encryption_iv';

// Suppress console logs during tests, except for errors
const originalConsoleLog = console.log;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;

// Silence normal logs in test environment
console.log = () => {};
console.info = () => {};
console.warn = () => {};

// Restore console methods after tests
afterAll(() => {
  console.log = originalConsoleLog;
  console.info = originalConsoleInfo;
  console.warn = originalConsoleWarn;
});

// Mock external services that shouldn't be called during tests
jest.mock('../services/emailService', () => ({
  sendWelcomeEmail: jest.fn().mockResolvedValue(true),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(true),
  sendTransactionConfirmationEmail: jest.fn().mockResolvedValue(true),
  sendKycStatusEmail: jest.fn().mockResolvedValue(true),
  sendRedemptionDispatchEmail: jest.fn().mockResolvedValue(true),
})); 