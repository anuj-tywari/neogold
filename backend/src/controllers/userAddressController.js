const { HttpError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');
const addressService = require('../services/addressService');

/**
 * @route GET /api/addresses
 * @desc Get all addresses for the user
 * @access Private
 */
const getUserAddresses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const addresses = await addressService.getUserAddresses(userId);
    
    return res.status(200).json({
      status: 'success',
      data: addresses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/addresses
 * @desc Add a new address for the user
 * @access Private
 */
const addUserAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Extract and validate required fields
    const { 
      addressLine1, 
      addressLine2, 
      city, 
      state, 
      postalCode, 
      country = 'India',
      addressType = 'HOME',
      isDefault = false,
      recipientName,
      phoneNumber,
      landmark
    } = req.body;
    
    // Input validation
    if (!addressLine1) {
      throw new HttpError(400, 'Address line 1 is required');
    }
    
    if (!city) {
      throw new HttpError(400, 'City is required');
    }
    
    if (!state) {
      throw new HttpError(400, 'State is required');
    }
    
    if (!postalCode || !/^\d{6}$/.test(postalCode)) {
      throw new HttpError(400, 'Valid 6-digit postal code is required');
    }
    
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      throw new HttpError(400, 'Phone number must be 10 digits');
    }
    
    if (!['HOME', 'OFFICE', 'OTHER'].includes(addressType)) {
      throw new HttpError(400, 'Address type must be HOME, OFFICE, or OTHER');
    }
    
    // Check limit of addresses
    const existingAddresses = await addressService.getUserAddresses(userId);
    if (existingAddresses.length >= 5) {
      throw new HttpError(400, 'Maximum limit of 5 addresses reached');
    }
    
    // Create address
    const address = await addressService.addUserAddress(userId, {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      addressType,
      isDefault,
      recipientName,
      phoneNumber,
      landmark
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Address added successfully',
      data: address
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/addresses/:id
 * @desc Get a specific address
 * @access Private
 */
const getAddressById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Address ID is required');
    }
    
    const address = await addressService.getAddressById(id, userId);
    
    if (!address) {
      throw new HttpError(404, 'Address not found or does not belong to user');
    }
    
    return res.status(200).json({
      status: 'success',
      data: address
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT /api/addresses/:id
 * @desc Update an address
 * @access Private
 */
const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Address ID is required');
    }
    
    // Check if address exists and belongs to user
    const existingAddress = await addressService.getAddressById(id, userId);
    if (!existingAddress) {
      throw new HttpError(404, 'Address not found or does not belong to user');
    }
    
    // Extract updatable fields
    const { 
      addressLine1, 
      addressLine2, 
      city, 
      state, 
      postalCode, 
      country,
      addressType,
      isDefault,
      recipientName,
      phoneNumber,
      landmark
    } = req.body;
    
    // Validate fields
    if (postalCode && !/^\d{6}$/.test(postalCode)) {
      throw new HttpError(400, 'Postal code must be 6 digits');
    }
    
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      throw new HttpError(400, 'Phone number must be 10 digits');
    }
    
    if (addressType && !['HOME', 'OFFICE', 'OTHER'].includes(addressType)) {
      throw new HttpError(400, 'Address type must be HOME, OFFICE, or OTHER');
    }
    
    // Update address
    const updatedAddress = await addressService.updateAddress(id, userId, {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      addressType,
      isDefault,
      recipientName,
      phoneNumber,
      landmark
    });
    
    return res.status(200).json({
      status: 'success',
      message: 'Address updated successfully',
      data: updatedAddress
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route DELETE /api/addresses/:id
 * @desc Delete an address
 * @access Private
 */
const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Address ID is required');
    }
    
    // Check if address exists and belongs to user
    const existingAddress = await addressService.getAddressById(id, userId);
    if (!existingAddress) {
      throw new HttpError(404, 'Address not found or does not belong to user');
    }
    
    // Delete address
    await addressService.deleteAddress(id, userId);
    
    return res.status(200).json({
      status: 'success',
      message: 'Address deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT /api/addresses/:id/set-default
 * @desc Set an address as default
 * @access Private
 */
const setDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    if (!id) {
      throw new HttpError(400, 'Address ID is required');
    }
    
    // Check if address exists and belongs to user
    const existingAddress = await addressService.getAddressById(id, userId);
    if (!existingAddress) {
      throw new HttpError(404, 'Address not found or does not belong to user');
    }
    
    // Set as default
    await addressService.setDefaultAddress(id, userId);
    
    return res.status(200).json({
      status: 'success',
      message: 'Address set as default successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserAddresses,
  addUserAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress
}; 