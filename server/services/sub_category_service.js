const { SubCategory } = require('../models/models');
const { ServiceFactoryHandler } = require('../utils/utils');

// @desc Create a new subCategory
// @route POST /api/sub-categories
// @access Private
exports.createSubCategory = ServiceFactoryHandler.create(SubCategory);

// @desc Get all subCategories
// @route GET /api/sub-categories
// @access Public
exports.getAllSubCategories = ServiceFactoryHandler.fetchAll(SubCategory);

// @desc Get a subCategory by ID
// @route GET /api/subCategories/:id
// @access Public
exports.getSubCategoryById = ServiceFactoryHandler.fetchById(SubCategory);

// @desc Update a subCategory by ID
// @route PUT /api/subCategories/:id
// @access Private
exports.updateSubCategory = ServiceFactoryHandler.update(SubCategory);

// @desc Delete a subCategory
// @route DELETE /api/subCategories/:id
// @access Private
exports.deleteSubCategory = ServiceFactoryHandler.delete(SubCategory);
