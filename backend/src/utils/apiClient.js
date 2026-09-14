const axios = require('axios');
const logger = require('./logger');
const { HttpError } = require('../middleware/errorHandler');

/**
 * Configurable API client for external API calls
 */
class ApiClient {
  /**
   * Create a new API client
   * @param {Object} config - Configuration options
   * @param {string} config.baseURL - Base URL for API calls
   * @param {Object} config.headers - Default headers
   * @param {number} config.timeout - Request timeout in ms
   * @param {Function} config.errorHandler - Custom error handler
   */
  constructor(config = {}) {
    this.client = axios.create({
      baseURL: config.baseURL || '',
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {})
      },
      timeout: config.timeout || 30000 // 30 seconds default
    });
    
    this.errorHandler = config.errorHandler || this.defaultErrorHandler;
    
    // Add request interceptor for logging
    this.client.interceptors.request.use(
      config => {
        logger.debug(`API Request: ${config.method.toUpperCase()} ${config.url}`);
        return config;
      },
      error => {
        logger.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );
    
    // Add response interceptor for logging
    this.client.interceptors.response.use(
      response => {
        logger.debug(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      error => {
        logger.error('API Response Error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Set authorization header
   * @param {string} token - Authorization token
   * @param {string} type - Token type (e.g., 'Bearer')
   */
  setAuthToken(token, type = 'Bearer') {
    this.client.defaults.headers.common['Authorization'] = `${type} ${token}`;
  }
  
  /**
   * Clear authorization header
   */
  clearAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }
  
  /**
   * Set a custom header
   * @param {string} name - Header name
   * @param {string} value - Header value
   */
  setHeader(name, value) {
    this.client.defaults.headers.common[name] = value;
  }
  
  /**
   * Default error handler
   * @param {Error} error - Axios error
   * @throws {HttpError} Custom HTTP error
   */
  defaultErrorHandler(error) {
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      const statusCode = error.response.status;
      const message = error.response.data?.message || 'External API error';
      
      throw new HttpError(statusCode, message);
    } else if (error.request) {
      // Request was made but no response was received
      throw new HttpError(504, 'No response from external API');
    } else {
      // Error in setting up the request
      throw new HttpError(500, error.message || 'External API request failed');
    }
  }
  
  /**
   * Make a GET request
   * @param {string} url - URL to call
   * @param {Object} params - Query parameters
   * @param {Object} options - Additional axios options
   * @returns {Promise<Object>} Response data
   */
  async get(url, params = {}, options = {}) {
    try {
      const response = await this.client.get(url, {
        params,
        ...options
      });
      
      return response.data;
    } catch (error) {
      return this.errorHandler(error);
    }
  }
  
  /**
   * Make a POST request
   * @param {string} url - URL to call
   * @param {Object} data - Request body
   * @param {Object} options - Additional axios options
   * @returns {Promise<Object>} Response data
   */
  async post(url, data = {}, options = {}) {
    try {
      const response = await this.client.post(url, data, options);
      
      return response.data;
    } catch (error) {
      return this.errorHandler(error);
    }
  }
  
  /**
   * Make a PUT request
   * @param {string} url - URL to call
   * @param {Object} data - Request body
   * @param {Object} options - Additional axios options
   * @returns {Promise<Object>} Response data
   */
  async put(url, data = {}, options = {}) {
    try {
      const response = await this.client.put(url, data, options);
      
      return response.data;
    } catch (error) {
      return this.errorHandler(error);
    }
  }
  
  /**
   * Make a DELETE request
   * @param {string} url - URL to call
   * @param {Object} options - Additional axios options
   * @returns {Promise<Object>} Response data
   */
  async delete(url, options = {}) {
    try {
      const response = await this.client.delete(url, options);
      
      return response.data;
    } catch (error) {
      return this.errorHandler(error);
    }
  }
  
  /**
   * Make a PATCH request
   * @param {string} url - URL to call
   * @param {Object} data - Request body
   * @param {Object} options - Additional axios options
   * @returns {Promise<Object>} Response data
   */
  async patch(url, data = {}, options = {}) {
    try {
      const response = await this.client.patch(url, data, options);
      
      return response.data;
    } catch (error) {
      return this.errorHandler(error);
    }
  }
}

// Create default instance
const apiClient = new ApiClient();

module.exports = {
  ApiClient,
  apiClient
}; 