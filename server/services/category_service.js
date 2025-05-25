const Category = require('../models/category');
const { apiOptions } = require('../utils/utils');

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
exports.getCategories = async (req, res) => {
    const query = new apiOptions(Category.find(), req.query).filter().sort().limitFields().paginate();
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
exports.getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category)
        return res.status(404).send({ message: 'Category not found' });
    return res.status(200).send({
        message: 'Category retrieved successfully',
        data: category
    });
}

// @desc Update a category by ID
// @route PUT /api/categories/:id
// @access Private
exports.updateCategory = async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedCategory)
        return res.status(404).send({ message: 'Category not found' });
    return res.status(200).send({
        message: 'Category updated successfully',
        data: updatedCategory
    });
}

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private
exports.deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
        return res.status(404).send({ message: 'Category not found' });
    return res.status(200).send({
        message: 'Category deleted successfully',
        data: category
    });
}