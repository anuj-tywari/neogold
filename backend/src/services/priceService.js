const { db } = require('../config/database');
const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const axios = require('axios');
const config = require('../config/config');

/**
 * Get latest gold prices from the database
 * @returns {Object} Latest buy and sell prices
 */
async function getLatestPrices() {
  try {
    const latestPrice = await db('gold_prices')
      .orderBy('createdAt', 'desc')
      .first();
    
    if (!latestPrice) {
      // If no prices exist, fetch from external API and create
      return fetchAndUpdatePrices();
    }
    
    // Check if prices are stale (older than 15 minutes)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    if (new Date(latestPrice.createdAt) < fifteenMinutesAgo) {
      // If prices are stale, fetch fresh prices
      return fetchAndUpdatePrices();
    }
    
    return latestPrice;
  } catch (error) {
    logger.error('Error fetching latest prices', { error });
    throw new HttpError(500, 'Unable to retrieve gold prices');
  }
}

/**
 * Fetch current market price from external API and update database
 * @returns {Object} Updated prices
 */
async function fetchAndUpdatePrices() {
  try {
    // In a real application, this would call an actual API
    // For demo purposes, we'll simulate fetching from an API
    const goldPrice = await fetchGoldPriceFromAPI();
    
    // Apply business logic for buy/sell prices
    // Example: buy price is 3% above market, sell price is 2% below market
    const marketPrice = goldPrice.pricePerGram;
    const buyPrice = marketPrice * 1.03;
    const sellPrice = marketPrice * 0.98;
    
    // Store in database
    const [newPrice] = await db('gold_prices').insert({
      marketPrice,
      buyPrice,
      sellPrice,
      source: goldPrice.source,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning('*');
    
    logger.info('Gold prices updated', { 
      marketPrice, buyPrice, sellPrice
    });
    
    return newPrice;
  } catch (error) {
    logger.error('Error updating gold prices', { error });
    throw new HttpError(500, 'Failed to update gold prices');
  }
}

/**
 * Mock function to fetch gold price from an external API
 * In a real application, this would integrate with an actual market data API
 * @returns {Object} Current gold price data
 */
async function fetchGoldPriceFromAPI() {
  try {
    // For a real application, you would use something like:
    // const response = await axios.get(config.goldPriceApi.url, {
    //   headers: { 'Authorization': `Bearer ${config.goldPriceApi.apiKey}` }
    // });
    
    // Mock implementation for demo purposes
    logger.info('Fetching gold price from external API');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate a somewhat realistic gold price in INR per gram (around ₹6,500)
    const basePrice = 6500;
    const randomVariation = (Math.random() - 0.5) * 200; // +/- ₹100
    const pricePerGram = basePrice + randomVariation;
    
    return {
      pricePerGram,
      currency: 'INR',
      unit: 'gram',
      source: 'mock-gold-price-api',
      timestamp: new Date()
    };
  } catch (error) {
    logger.error('Error fetching gold price from API', { error });
    throw new HttpError(500, 'Failed to fetch gold price from external API');
  }
}

/**
 * Schedule regular updates of gold prices
 * Should be called when the application starts
 */
function scheduleRegularPriceUpdates() {
  // Update prices every 15 minutes
  const updateInterval = 15 * 60 * 1000;
  
  setInterval(async () => {
    try {
      await fetchAndUpdatePrices();
      logger.info('Scheduled gold price update completed');
    } catch (error) {
      logger.error('Scheduled gold price update failed', { error });
    }
  }, updateInterval);
  
  logger.info(`Gold price updates scheduled every ${updateInterval / 60000} minutes`);
}

/**
 * Get historical price trends
 * @param {Object} options - Query options
 * @param {string} options.period - 'day', 'week', 'month', 'year'
 * @returns {Array} Historical price data points
 */
async function getHistoricalPrices(options) {
  const { period = 'week' } = options;
  
  let startDate;
  const now = new Date();
  
  switch (period) {
    case 'day':
      startDate = new Date(now.setDate(now.getDate() - 1));
      break;
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'year':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      startDate = new Date(now.setDate(now.getDate() - 7));
  }
  
  try {
    let query = db('gold_prices')
      .where('createdAt', '>=', startDate)
      .orderBy('createdAt', 'asc');
    
    // For longer periods, we may want to aggregate data to reduce result size
    if (period === 'month' || period === 'year') {
      // This is a simplified approach; in a real app, you might use more sophisticated aggregation
      query = db.raw(`
        SELECT 
          DATE_TRUNC('day', "createdAt") AS date,
          ROUND(AVG("marketPrice")::numeric, 2) AS "marketPrice",
          ROUND(AVG("buyPrice")::numeric, 2) AS "buyPrice",
          ROUND(AVG("sellPrice")::numeric, 2) AS "sellPrice"
        FROM gold_prices
        WHERE "createdAt" >= ?
        GROUP BY DATE_TRUNC('day', "createdAt")
        ORDER BY date ASC
      `, [startDate]);
      
      return (await query).rows;
    }
    
    return await query;
  } catch (error) {
    logger.error('Error fetching historical prices', { error, period });
    throw new HttpError(500, 'Unable to retrieve historical gold prices');
  }
}

module.exports = {
  getLatestPrices,
  fetchAndUpdatePrices,
  scheduleRegularPriceUpdates,
  getHistoricalPrices
}; 