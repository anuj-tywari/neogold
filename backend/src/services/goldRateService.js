const axios = require('axios');
const cheerio = require('cheerio');
const { BuyGoldRate, SellGoldRate } = require('../models');
const logger = require('../utils/logger');
const { HttpError } = require('../middleware/errorHandler');

/**
 * Scrape gold rates from Arihant Spot website
 * @returns {Promise<Object>} - Gold rates
 */
const scrapeGoldRates = async () => {
  try {
    // Fetch the webpage content
    const response = await axios.get('https://www.arihantspot.in/');
    const html = response.data;
    
    // Load HTML into cheerio
    const $ = cheerio.load(html);
    
    // Extract gold rates - this will need to be adjusted based on actual HTML structure
    // Example selectors (these need to be replaced with actual selectors)
    const buyRateRaw = $('.gold-buy-rate').text().trim();
    const sellRateRaw = $('.gold-sell-rate').text().trim();
    
    // Parse rates (remove non-numeric characters and convert to float)
    const buyRate = parseFloat(buyRateRaw.replace(/[^0-9.]/g, '')) || null;
    const sellRate = parseFloat(sellRateRaw.replace(/[^0-9.]/g, '')) || null;
    
    // Get timestamp from the page
    const timestampRaw = $('.rate-timestamp').text().trim();
    const timestamp = new Date(timestampRaw) || new Date();
    
    // If we couldn't extract rates, throw an error
    if (!buyRate || !sellRate) {
      throw new Error('Failed to extract gold rates from the website');
    }
    
    return {
      buyRate,
      sellRate,
      timestamp,
      source: 'arihantspot.in'
    };
  } catch (error) {
    logger.error(`Error scraping gold rates: ${error.message}`);
    throw new Error('Failed to scrape gold rates: ' + error.message);
  }
};

/**
 * Save new buy gold rate
 * @param {Object} rateData - Rate data
 * @param {string} userId - Admin user ID
 * @returns {Promise<Object>} - Saved rate
 */
const saveBuyGoldRate = async (rateData, userId) => {
  try {
    // Deactivate current active rate
    await BuyGoldRate.update(
      { 
        isActive: false,
        effectiveTo: new Date()
      },
      { where: { isActive: true } }
    );
    
    // Create new rate
    const rate = await BuyGoldRate.create({
      ratePerGram: rateData.ratePerGram,
      purity: rateData.purity || '24K',
      source: rateData.source || 'MANUAL',
      updatedBy: userId,
      isActive: true,
      effectiveFrom: new Date(),
      rateInUSD: rateData.rateInUSD,
      conversionRate: rateData.conversionRate,
      vendorId: rateData.vendorId
    });
    
    return rate;
  } catch (error) {
    logger.error(`Error saving buy gold rate: ${error.message}`);
    throw new HttpError(500, 'Failed to save buy gold rate');
  }
};

/**
 * Save new sell gold rate
 * @param {Object} rateData - Rate data
 * @param {string} userId - Admin user ID
 * @returns {Promise<Object>} - Saved rate
 */
const saveSellGoldRate = async (rateData, userId) => {
  try {
    // Deactivate current active rate
    await SellGoldRate.update(
      { 
        isActive: false,
        effectiveTo: new Date()
      },
      { where: { isActive: true } }
    );
    
    // Create new rate
    const rate = await SellGoldRate.create({
      ratePerGram: rateData.ratePerGram,
      purity: rateData.purity || '24K',
      source: rateData.source || 'MANUAL',
      updatedBy: userId,
      isActive: true,
      effectiveFrom: new Date(),
      rateInUSD: rateData.rateInUSD,
      conversionRate: rateData.conversionRate,
      vendorId: rateData.vendorId
    });
    
    return rate;
  } catch (error) {
    logger.error(`Error saving sell gold rate: ${error.message}`);
    throw new HttpError(500, 'Failed to save sell gold rate');
  }
};

/**
 * Auto-update gold rates from external source
 * @param {string} userId - Admin user ID
 * @returns {Promise<Object>} - Updated rates
 */
const autoUpdateGoldRates = async (userId) => {
  try {
    // Scrape rates from Arihant Spot
    const scrapedRates = await scrapeGoldRates();
    
    // Save buy rate
    const buyRate = await saveBuyGoldRate({
      ratePerGram: scrapedRates.buyRate,
      source: scrapedRates.source,
      purity: '24K'
    }, userId);
    
    // Save sell rate
    const sellRate = await saveSellGoldRate({
      ratePerGram: scrapedRates.sellRate,
      source: scrapedRates.source,
      purity: '24K'
    }, userId);
    
    return {
      buyRate,
      sellRate,
      timestamp: new Date()
    };
  } catch (error) {
    logger.error(`Error auto-updating gold rates: ${error.message}`);
    throw new HttpError(500, 'Failed to auto-update gold rates');
  }
};

/**
 * Get current gold rates
 * @returns {Promise<Object>} - Current rates
 */
const getCurrentGoldRates = async () => {
  try {
    const buyRate = await BuyGoldRate.findOne({
      where: { isActive: true },
      order: [['effectiveFrom', 'DESC']]
    });
    
    const sellRate = await SellGoldRate.findOne({
      where: { isActive: true },
      order: [['effectiveFrom', 'DESC']]
    });
    
    return {
      buyRate: buyRate ? buyRate.ratePerGram : null,
      sellRate: sellRate ? sellRate.ratePerGram : null,
      buyRateTimestamp: buyRate ? buyRate.effectiveFrom : null,
      sellRateTimestamp: sellRate ? sellRate.effectiveFrom : null
    };
  } catch (error) {
    logger.error(`Error getting current gold rates: ${error.message}`);
    throw new HttpError(500, 'Failed to retrieve current gold rates');
  }
};

/**
 * Get gold rate history
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Rate history
 */
const getGoldRateHistory = async (options = {}) => {
  try {
    const { type = 'BUY', limit = 30, page = 1 } = options;
    
    const offset = (page - 1) * limit;
    
    let rates;
    if (type === 'BUY') {
      rates = await BuyGoldRate.findAndCountAll({
        order: [['effectiveFrom', 'DESC']],
        limit,
        offset
      });
    } else {
      rates = await SellGoldRate.findAndCountAll({
        order: [['effectiveFrom', 'DESC']],
        limit,
        offset
      });
    }
    
    return {
      totalCount: rates.count,
      totalPages: Math.ceil(rates.count / limit),
      currentPage: page,
      rates: rates.rows
    };
  } catch (error) {
    logger.error(`Error getting gold rate history: ${error.message}`);
    throw new HttpError(500, 'Failed to retrieve gold rate history');
  }
};

module.exports = {
  scrapeGoldRates,
  saveBuyGoldRate,
  saveSellGoldRate,
  autoUpdateGoldRates,
  getCurrentGoldRates,
  getGoldRateHistory
}; 