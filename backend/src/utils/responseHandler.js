/**
 * Standardized API response formatter
 * Ensures consistent structure across all API endpoints
 */
class ResponseHandler {
  /**
   * Creates a success response object
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code (default: 200)
   * @param {string} message - Success message
   * @param {Object|Array} data - Response data
   * @param {Object} meta - Additional metadata (pagination, etc.)
   * @returns {Object} Express response
   */
  static success(res, { statusCode = 200, message = 'Success', data = null, meta = null }) {
    const response = {
      status: 'success',
      message
    };
    
    if (data !== null) {
      response.data = data;
    }
    
    if (meta !== null) {
      response.meta = meta;
    }
    
    return res.status(statusCode).json(response);
  }
  
  /**
   * Creates an error response object
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {string} message - Error message
   * @param {Object} errors - Detailed error information
   * @returns {Object} Express response
   */
  static error(res, { statusCode = 500, message = 'Internal Server Error', errors = null }) {
    const response = {
      status: 'error',
      message
    };
    
    if (errors !== null) {
      response.errors = errors;
    }
    
    return res.status(statusCode).json(response);
  }
  
  /**
   * Creates a paginated response
   * @param {Object} res - Express response object
   * @param {Object|Array} data - Response data
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   * @param {number} total - Total number of items
   * @param {string} message - Success message
   * @returns {Object} Express response
   */
  static paginated(res, { data, page, limit, total, message = 'Success' }) {
    const totalPages = Math.ceil(total / limit);
    
    return this.success(res, {
      statusCode: 200,
      message,
      data,
      meta: {
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      }
    });
  }
  
  /**
   * Creates a created response (201)
   * @param {Object} res - Express response object
   * @param {Object} data - Created resource data
   * @param {string} message - Success message
   * @returns {Object} Express response
   */
  static created(res, { data, message = 'Resource created successfully' }) {
    return this.success(res, {
      statusCode: 201,
      message,
      data
    });
  }
  
  /**
   * Creates a no content response (204)
   * @param {Object} res - Express response object
   * @returns {Object} Express response
   */
  static noContent(res) {
    return res.status(204).end();
  }
  
  /**
   * Creates a bad request response (400)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {Object} errors - Validation errors
   * @returns {Object} Express response
   */
  static badRequest(res, { message = 'Bad Request', errors = null }) {
    return this.error(res, {
      statusCode: 400,
      message,
      errors
    });
  }
  
  /**
   * Creates an unauthorized response (401)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @returns {Object} Express response
   */
  static unauthorized(res, { message = 'Unauthorized' }) {
    return this.error(res, {
      statusCode: 401,
      message
    });
  }
  
  /**
   * Creates a forbidden response (403)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @returns {Object} Express response
   */
  static forbidden(res, { message = 'Forbidden' }) {
    return this.error(res, {
      statusCode: 403,
      message
    });
  }
  
  /**
   * Creates a not found response (404)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @returns {Object} Express response
   */
  static notFound(res, { message = 'Resource not found' }) {
    return this.error(res, {
      statusCode: 404,
      message
    });
  }
  
  /**
   * Creates a conflict response (409)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @returns {Object} Express response
   */
  static conflict(res, { message = 'Resource conflict' }) {
    return this.error(res, {
      statusCode: 409,
      message
    });
  }
}

module.exports = ResponseHandler; 