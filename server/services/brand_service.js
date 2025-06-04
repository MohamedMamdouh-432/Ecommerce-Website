const { Brand } = require('../models/models');
const { ServiceFactoryHandler } = require('../utils/utils');

// @desc Create a new brand
// @route POST /api/brands
// @access Private
exports.createBrand = ServiceFactoryHandler.create(Brand);

// @desc Get all brands
// @route GET /api/brands
// @access Public
exports.getAllBrands = ServiceFactoryHandler.fetchAll(Brand);

// @desc Get a brand by ID
// @route GET /api/brands/:id
// @access Public
exports.getBrandById = ServiceFactoryHandler.fetchById(Brand);

// @desc Update a brand by ID
// @route PUT /api/brands/:id
// @access Private
exports.updateBrand = ServiceFactoryHandler.update(Brand);

// @desc Delete a brand
// @route DELETE /api/brands/:id
// @access Private
exports.deleteBrand = ServiceFactoryHandler.delete(Brand);