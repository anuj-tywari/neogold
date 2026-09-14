require('dotenv').config();
const { sequelize } = require('../models');
const syncDatabase = require('./syncModels');
const seedDatabase = require('./seedDatabase');
const logger = require('../utils/logger');

/**
 * Reset database (drop all tables and recreate with seed data)
 */
const resetDatabase = async () => {
  try {
    logger.warn('Starting database reset - this will delete all data!');
    
    // Ask for confirmation in production
    if (process.env.NODE_ENV === 'production') {
      logger.error('Cannot reset database in production environment!');
      return false;
    }
    
    // Sync models with force option to drop all tables
    const syncSuccess = await syncDatabase({ force: true });
    
    if (!syncSuccess) {
      logger.error('Failed to sync database during reset');
      return false;
    }
    
    logger.info('Database tables dropped and recreated successfully');
    
    // Seed database with initial data
    const seedSuccess = await seedDatabase();
    
    if (!seedSuccess) {
      logger.error('Failed to seed database during reset');
      return false;
    }
    
    logger.info('Database reset and seed completed successfully');
    return true;
  } catch (error) {
    logger.error(`Error resetting database: ${error.message}`);
    logger.error(error.stack);
    return false;
  }
};

// Run reset if this script is executed directly
if (require.main === module) {
  resetDatabase()
    .then((success) => {
      if (success) {
        logger.info('Database reset script completed successfully');
        process.exit(0);
      } else {
        logger.error('Database reset script failed');
        process.exit(1);
      }
    })
    .catch((error) => {
      logger.error(`Unhandled error in reset script: ${error.message}`);
      logger.error(error.stack);
      process.exit(1);
    });
}

module.exports = resetDatabase; 