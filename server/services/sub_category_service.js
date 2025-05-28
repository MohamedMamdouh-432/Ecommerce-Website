const SubCategory = require('../models/sub_category');
const { ApiOptions, ApiError } = require('../utils/utils');

// @desc Create a new subCategory
// @route POST /api/sub-categories
// @access Private
exports.createSubCategory = async (req, res) => {
    const newSubCategory = await SubCategory.create(req.body);
    res.status(201).send({
        message: 'SubCategory created successfully',
        data: newSubCategory
    });
}

// @desc Get all subCategories
// @route GET /api/sub-categories
// @access Public
exports.getAllSubCategories = async (req, res) => {
    const query = new ApiOptions(SubCategory.find().select(' -category'), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const subCategories = await query.operation;
    res.status(200).send({
        message: 'SubCategories retrieved successfully',
        data: {
            page: parseInt(req.query.page) || 1,
            count: subCategories.length,
            subCategories,
        }
    });
}

// @desc Get a subCategory by ID
// @route GET /api/subCategories/:id
// @access Public
exports.getSubCategoryById = async (req, res, next) => {
    const subCategory = await SubCategory.findById(req.params.id).select(' -category');
    if (!subCategory)
        return next(new ApiError('Sub Category not found', 404));
    return res.status(200).send({
        message: 'SubCategory retrieved successfully',
        data: subCategory
    });
}

// @desc Update a subCategory by ID
// @route PUT /api/subCategories/:id
// @access Private
exports.updateSubCategory = async (req, res, next) => {
    const updatedCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedCategory)
        return next(new ApiError('Sub Category not found', 404));
    return res.status(200).send({
        message: 'SubCategory updated successfully',
        data: updatedCategory
    });
}

// @desc Delete a subCategory
// @route DELETE /api/subCategories/:id
// @access Private
exports.deleteSubCategory = async (req, res, next) => {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory)
        return next(new ApiError('Sub Category not found', 404));
    return res.status(200).send({
        message: 'SubCategory deleted successfully',
        data: subCategory
    });
}