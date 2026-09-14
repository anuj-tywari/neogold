require('dotenv').config();
const { syncModels } = require('../models');
const logger = require('../utils/logger');

/**
 * Sync database models
 * @param {Object} options - Sync options (force, alter)
 */
const syncDatabase = async (options = {}) => {
  try {
    logger.info('Starting database synchronization...');
    logger.info(`Options: ${JSON.stringify(options)}`);
    
    const success = await syncModels(options);
    
    if (success) {
      logger.info('Database synchronization completed successfully');
      return true;
    } else {
      logger.error('Database synchronization failed');
      return false;
    }
  } catch (error) {
    logger.error(`Error synchronizing database: ${error.message}`);
    logger.error(error.stack);
    return false;
  }
};

// Get command line arguments
const args = process.argv.slice(2);
const options = {};

// Parse command line arguments
if (args.includes('--force')) {
  options.force = true;
  logger.warn('Using force option - this will drop and recreate all tables!');
}

if (args.includes('--alter')) {
  options.alter = true;
  logger.warn('Using alter option - this will modify existing tables!');
}

// Run synchronization if this script is executed directly
if (require.main === module) {
  syncDatabase(options)
    .then((success) => {
      if (success) {
        logger.info('Database sync script completed successfully');
        process.exit(0);
      } else {
        logger.error('Database sync script failed');
        process.exit(1);
      }
    })
    .catch((error) => {
      logger.error(`Unhandled error in sync script: ${error.message}`);
      logger.error(error.stack);
      process.exit(1);
    });
}

module.exports = syncDatabase; 