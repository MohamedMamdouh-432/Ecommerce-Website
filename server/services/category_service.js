const Category = require('../models/category');
const { ApiOptions, ApiError } = require('../utils/utils');

// @desc Create a new category
// @route POST /api/categories
// @access Private
exports.createCategory = async (req, res) => {
    const newCategory = await Category.create(req.body);
    res.status(201).send({
        message: 'Category created successfully',
        data: newCategory
    });
}

// @desc Get all categories
// @route GET /api/categories
// @access Public
exports.getAllCategories = async (req, res) => {
    const query = new ApiOptions(Category.find(), req.query).filter().sort().limitFields().paginate();
    const categories = await query.operation;
    res.status(200).send({
        message: 'Categories retrieved successfully',
        data: {
            page: parseInt(req.query.page) || 1,
            count: categories.length,
            categories,
        }
    });
}

// @desc Get a category by ID
// @route GET /api/categories/:id
// @access Public
exports.getCategoryById = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category)
        return next(new ApiError('Category not found', 404));
    return res.status(200).send({
        message: 'Category retrieved successfully',
        data: category
    });
}

// @desc Update a category by ID
// @route PUT /api/categories/:id
// @access Private
exports.updateCategory = async (req, res, next) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedCategory)
        return next(new ApiError('Category not found', 404));
    return res.status(200).send({
        message: 'Category updated successfully',
        data: updatedCategory
    });
}

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private
exports.deleteCategory = async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
        return next(new ApiError('Category not found', 404));
    return res.status(200).send({
        message: 'Category deleted successfully',
        data: category
    });
}