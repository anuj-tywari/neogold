require('dotenv').config();
const { 
  User, 
  Wallet, 
  GoldPrice, 
  Product, 
  Vault, 
  syncModels 
} = require('../models');
const logger = require('../utils/logger');

/**
 * Seed database with initial data
 */
const seedDatabase = async () => {
  try {
    logger.info('Starting database seeding...');

    // Sync models with database
    await syncModels({ alter: true });
    logger.info('Database synchronized');

    // Create admin user
    const adminUser = await User.findOrCreate({
      where: { email: 'admin@neogold.com' },
      defaults: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@neogold.com',
        password: 'Admin@123', // This will be hashed by User model hooks
        role: 'ADMIN',
        isActive: true,
        isEmailVerified: true
      }
    });
    logger.info('Admin user created');

    // Create super admin user
    const superAdminUser = await User.findOrCreate({
      where: { email: 'superadmin@neogold.com' },
      defaults: {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@neogold.com',
        password: 'SuperAdmin@123', // This will be hashed by User model hooks
        role: 'SUPER_ADMIN',
        isActive: true,
        isEmailVerified: true
      }
    });
    logger.info('Super admin user created');

    // Create test user
    const testUser = await User.findOrCreate({
      where: { email: 'test@neogold.com' },
      defaults: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@neogold.com',
        password: 'Test@123', // This will be hashed by User model hooks
        role: 'USER',
        isActive: true,
        isEmailVerified: true
      }
    });
    logger.info('Test user created');

    // Create wallet for test user if doesn't exist
    const [user, isNewUser] = testUser;
    if (isNewUser) {
      await Wallet.create({
        userId: user.id,
        goldBalanceInGrams: 10.0, // Start with 10g for testing
        walletStatus: 'ACTIVE'
      });
      logger.info('Test user wallet created');
    }

    // Create initial gold price
    await GoldPrice.findOrCreate({
      where: { isActive: true },
      defaults: {
        buyPricePerGram: 5200.00, // Example price in INR
        sellPricePerGram: 5000.00, // Typically sell price is lower than buy price
        source: 'SEED',
        isActive: true,
        updatedBy: superAdminUser[0].id
      }
    });
    logger.info('Initial gold price created');

    // Create vault
    await Vault.findOrCreate({
      where: { name: 'Primary Vault' },
      defaults: {
        name: 'Primary Vault',
        location: 'Mumbai, India',
        totalGoldInGrams: 1000, // 1 kg of gold
        status: 'ACTIVE'
      }
    });
    logger.info('Primary vault created');

    // Create sample products
    const products = [
      {
        name: '1g Gold Coin',
        description: '24K (99.9%) pure gold coin, 1 gram weight',
        weightInGrams: 1.0,
        purity: 99.9,
        type: 'COIN',
        manufacturer: 'NeoGold',
        makingCharges: 100.00,
        deliveryCharges: 50.00,
        isActive: true,
        stockAvailable: 100,
        minimumOrderQuantity: 1,
        maximumOrderQuantity: 10
      },
      {
        name: '5g Gold Coin',
        description: '24K (99.9%) pure gold coin, 5 gram weight',
        weightInGrams: 5.0,
        purity: 99.9,
        type: 'COIN',
        manufacturer: 'NeoGold',
        makingCharges: 200.00,
        deliveryCharges: 50.00,
        isActive: true,
        stockAvailable: 50,
        minimumOrderQuantity: 1,
        maximumOrderQuantity: 5
      },
      {
        name: '10g Gold Bar',
        description: '24K (99.9%) pure gold bar, 10 gram weight',
        weightInGrams: 10.0,
        purity: 99.9,
        type: 'BAR',
        manufacturer: 'NeoGold',
        makingCharges: 300.00,
        deliveryCharges: 100.00,
        isActive: true,
        stockAvailable: 25,
        minimumOrderQuantity: 1,
        maximumOrderQuantity: 2
      }
    ];

    for (const product of products) {
      await Product.findOrCreate({
        where: { 
          name: product.name,
          weightInGrams: product.weightInGrams 
        },
        defaults: product
      });
    }
    logger.info('Sample products created');

    logger.info('Database seeding completed successfully');
    return true;
  } catch (error) {
    logger.error(`Error seeding database: ${error.message}`);
    logger.error(error.stack);
    return false;
  }
};

// Run seeding if this script is executed directly
if (require.main === module) {
  seedDatabase()
    .then((success) => {
      if (success) {
        logger.info('Database seeding script completed successfully');
        process.exit(0);
      } else {
        logger.error('Database seeding script failed');
        process.exit(1);
      }
    })
    .catch((error) => {
      logger.error(`Unhandled error in seeding script: ${error.message}`);
      logger.error(error.stack);
      process.exit(1);
    });
}

module.exports = seedDatabase; 