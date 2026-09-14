module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/scripts/**',
    '!src/tests/**',
    '!src/utils/logger.js',
    '!src/server.js',
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  testTimeout: 10000, // Increased timeout for database operations
}; 