const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const productService = require('../services/productService');

/**
 * @route GET /api/products
 * @desc Get all products with pagination and filters
 * @access Public
 */
const getAllProducts = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      weightRange, 
      sortBy = 'createdAt', 
      sortOrder = 'DESC',
      inStock 
    } = req.query;
    
    const products = await productService.getAllProducts({
      page: parseInt(page),
      limit: parseInt(limit),
      category,
      weightRange,
      sortBy,
      sortOrder,
      inStock: inStock === 'true'
    });
    
    return res.status(200).json({
      status: 'success',
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/products/:id
 * @desc Get product details by ID
 * @access Public
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Product ID is required');
    }
    
    const product = await productService.getProductById(id);
    
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
    
    return res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/products/categories
 * @desc Get all product categories
 * @access Public
 */
const getProductCategories = async (req, res, next) => {
  try {
    const categories = await productService.getProductCategories();
    
    return res.status(200).json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/products/featured
 * @desc Get featured products
 * @access Public
 */
const getFeaturedProducts = async (req, res, next) => {
  try {
    const featuredProducts = await productService.getFeaturedProducts();
    
    return res.status(200).json({
      status: 'success',
      data: featuredProducts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductCategories,
  getFeaturedProducts
}; 