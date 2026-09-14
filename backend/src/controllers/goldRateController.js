const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const goldRateService = require('../services/goldRateService');
const { goldRateApi } = require('../services/externalApiService');
const ResponseHandler = require('../utils/responseHandler');

/**
 * @route GET /api/gold-rates
 * @desc Get current gold rates
 * @access Public
 */
const getCurrentRates = async (req, res, next) => {
  try {
    const rates = await goldRateService.getCurrentGoldRates();
    
    return ResponseHandler.success(res, {
      message: 'Gold rates retrieved successfully',
      data: rates
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/gold-rates/history
 * @desc Get historical gold rates
 * @access Public
 */
const getRateHistory = async (req, res, next) => {
  try {
    const { type = 'BUY', page = 1, limit = 30 } = req.query;
    
    const history = await goldRateService.getGoldRateHistory({
      type,
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    return ResponseHandler.paginated(res, {
      data: history.rates,
      page,
      limit,
      total: history.totalCount,
      message: 'Gold rate history retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/gold-rates/buy
 * @desc Set new buy gold rate
 * @access Private (Admin only)
 */
const setBuyRate = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return ResponseHandler.forbidden(res, {
        message: 'Unauthorized access to set gold rates'
      });
    }
    
    const userId = req.user.id;
    
    const { 
      ratePerGram, 
      purity = '24K', 
      rateInUSD,
      conversionRate,
      vendorId
    } = req.body;
    
    if (!ratePerGram || isNaN(Number(ratePerGram)) || Number(ratePerGram) <= 0) {
      return ResponseHandler.badRequest(res, {
        message: 'Valid rate per gram is required'
      });
    }
    
    // Set new rate
    const rate = await goldRateService.saveBuyGoldRate({
      ratePerGram: Number(ratePerGram),
      purity,
      source: 'MANUAL',
      rateInUSD: rateInUSD ? Number(rateInUSD) : null,
      conversionRate: conversionRate ? Number(conversionRate) : null,
      vendorId
    }, userId);
    
    return ResponseHandler.created(res, {
      message: 'Buy gold rate updated successfully',
      data: rate
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/gold-rates/sell
 * @desc Set new sell gold rate
 * @access Private (Admin only)
 */
const setSellRate = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return ResponseHandler.forbidden(res, {
        message: 'Unauthorized access to set gold rates'
      });
    }
    
    const userId = req.user.id;
    
    const { 
      ratePerGram, 
      purity = '24K', 
      rateInUSD,
      conversionRate,
      vendorId
    } = req.body;
    
    if (!ratePerGram || isNaN(Number(ratePerGram)) || Number(ratePerGram) <= 0) {
      return ResponseHandler.badRequest(res, {
        message: 'Valid rate per gram is required'
      });
    }
    
    // Set new rate
    const rate = await goldRateService.saveSellGoldRate({
      ratePerGram: Number(ratePerGram),
      purity,
      source: 'MANUAL',
      rateInUSD: rateInUSD ? Number(rateInUSD) : null,
      conversionRate: conversionRate ? Number(conversionRate) : null,
      vendorId
    }, userId);
    
    return ResponseHandler.created(res, {
      message: 'Sell gold rate updated successfully',
      data: rate
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/gold-rates/auto-update
 * @desc Automatically update gold rates from external sources
 * @access Private (Admin only)
 */
const autoUpdateRates = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return ResponseHandler.forbidden(res, {
        message: 'Unauthorized access to update gold rates'
      });
    }
    
    const userId = req.user.id;
    
    // Auto-update rates
    const rates = await goldRateService.autoUpdateGoldRates(userId);
    
    return ResponseHandler.success(res, {
      message: 'Gold rates auto-updated successfully',
      data: rates
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/gold-rates/external
 * @desc Get gold rates from external API
 * @access Private (Admin only)
 */
const getExternalRates = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return ResponseHandler.forbidden(res, {
        message: 'Unauthorized access to external gold rates'
      });
    }
    
    // Get current rates from external API
    const externalRates = await goldRateApi.getCurrentRates();
    
    return ResponseHandler.success(res, {
      message: 'External gold rates retrieved successfully',
      data: externalRates
    });
  } catch (error) {
    logger.error('Failed to retrieve external gold rates:', error);
    
    if (error instanceof HttpError) {
      return ResponseHandler.error(res, {
        statusCode: error.statusCode,
        message: error.message
      });
    }
    
    return ResponseHandler.error(res, {
      statusCode: 500,
      message: 'Failed to retrieve external gold rates'
    });
  }
};

module.exports = {
  getCurrentRates,
  getRateHistory,
  setBuyRate,
  setSellRate,
  autoUpdateRates,
  getExternalRates
};