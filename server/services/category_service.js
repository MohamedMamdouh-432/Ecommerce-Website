const { Category } = require('../models/models');
const { ServiceFactoryHandler } = require('../utils/utils');

// @desc Create a new category
// @route POST /api/categories
// @access Private
exports.createCategory = ServiceFactoryHandler.create(Category);

// @desc Get all categories
// @route GET /api/categories
// @access Public
exports.getAllCategories = ServiceFactoryHandler.fetchAll(Category);

// @desc Get a category by ID
// @route GET /api/categories/:id
// @access Public
exports.getCategoryById = ServiceFactoryHandler.fetchById(Category);

// @desc Update a category by ID
// @route PUT /api/categories/:id
// @access Private
exports.updateCategory = ServiceFactoryHandler.update(Category);

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private
exports.deleteCategory = ServiceFactoryHandler.delete(Category);