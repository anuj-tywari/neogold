const { ApiClient } = require('../utils/apiClient');
const logger = require('../utils/logger');
const { HttpError } = require('../middleware/errorHandler');

/**
 * Service to handle external API interactions
 * Can be extended for different external APIs
 */
class ExternalApiService {
  /**
   * Initialize the service with an API client
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    this.apiClient = new ApiClient({
      baseURL: config.baseURL || process.env.EXTERNAL_API_URL,
      timeout: config.timeout || 30000,
      headers: {
        ...config.headers
      }
    });
    
    // Set authentication if provided
    if (config.apiKey) {
      this.setApiKey(config.apiKey);
    }
  }
  
  /**
   * Set API key for authentication
   * @param {string} apiKey - API key
   * @param {string} headerName - Header name (default: 'x-api-key')
   */
  setApiKey(apiKey, headerName = 'x-api-key') {
    this.apiClient.setHeader(headerName, apiKey);
  }
  
  /**
   * Set bearer token for authentication
   * @param {string} token - Bearer token
   */
  setBearerToken(token) {
    this.apiClient.setAuthToken(token);
  }
  
  /**
   * Make a GET request to external API
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Response data
   */
  async get(endpoint, params = {}, options = {}) {
    try {
      return await this.apiClient.get(endpoint, params, options);
    } catch (error) {
      logger.error(`External API GET request failed: ${endpoint}`, error);
      throw error;
    }
  }
  
  /**
   * Make a POST request to external API
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Response data
   */
  async post(endpoint, data = {}, options = {}) {
    try {
      return await this.apiClient.post(endpoint, data, options);
    } catch (error) {
      logger.error(`External API POST request failed: ${endpoint}`, error);
      throw error;
    }
  }
}

/**
 * Gold rates external API service
 * Example implementation for Arihant Spot API
 */
class GoldRateApiService extends ExternalApiService {
  constructor() {
    super({
      baseURL: process.env.GOLD_RATE_API_URL || 'https://api.arihantspot.in',
      apiKey: process.env.GOLD_RATE_API_KEY
    });
  }
  
  /**
   * Get current gold rates
   * @returns {Promise<Object>} Current gold rates
   */
  async getCurrentRates() {
    return this.get('/rates/current');
  }
  
  /**
   * Get historical gold rates
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} Historical gold rates
   */
  async getHistoricalRates(date) {
    return this.get('/rates/historical', { date });
  }
}

/**
 * Payment gateway API service
 * Example implementation for payment gateway
 */
class PaymentGatewayService extends ExternalApiService {
  constructor() {
    super({
      baseURL: process.env.PAYMENT_API_URL,
      headers: {
        'x-merchant-id': process.env.PAYMENT_MERCHANT_ID
      }
    });
    
    // Set authentication if API key is available
    if (process.env.PAYMENT_API_KEY) {
      this.setApiKey(process.env.PAYMENT_API_KEY);
    }
  }
  
  /**
   * Create a payment
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Payment response
   */
  async createPayment(paymentDetails) {
    return this.post('/payments', paymentDetails);
  }
  
  /**
   * Verify a payment
   * @param {string} paymentId - Payment ID
   * @returns {Promise<Object>} Payment verification response
   */
  async verifyPayment(paymentId) {
    return this.get(`/payments/${paymentId}/verify`);
  }
  
  /**
   * Refund a payment
   * @param {string} paymentId - Payment ID
   * @param {Object} refundDetails - Refund details
   * @returns {Promise<Object>} Refund response
   */
  async refundPayment(paymentId, refundDetails) {
    return this.post(`/payments/${paymentId}/refund`, refundDetails);
  }
}

// Create instances
const goldRateApi = new GoldRateApiService();
const paymentGateway = new PaymentGatewayService();

module.exports = {
  ExternalApiService,
  GoldRateApiService,
  PaymentGatewayService,
  goldRateApi,
  paymentGateway
}; 