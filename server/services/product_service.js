const { Product } = require('../models/models');
const { ServiceFactoryHandler } = require('../utils/utils');

// @desc Create new products
// @route POST /api/products
// @access Private
exports.createProducts = ServiceFactoryHandler.create(Product);

// @desc Get all products
// @route GET /api/products
// @access Public
exports.getAllProducts = ServiceFactoryHandler.fetchAll(Product);
    
// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
exports.getProductById = ServiceFactoryHandler.fetchById(Product);

// @desc Update a product by ID
// @route PUT /api/products/:id
// @access Private
exports.updateProduct = ServiceFactoryHandler.update(Product);

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private
exports.deleteProducts = ServiceFactoryHandler.delete(Product);

