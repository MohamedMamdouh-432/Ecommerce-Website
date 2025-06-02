const { Brand } = require('../models/models');
const { ApiOptions, ApiError } = require('../utils/utils');

// @desc Create a new brand
// @route POST /api/brands
// @access Private
exports.createBrand = async (req, res) => {
    const newBrand = await Brand.create(req.body);
    res.status(201).send({
        message: 'Brand created successfully',
        data: newBrand
    });
}

// @desc Get all brands
// @route GET /api/brands
// @access Public
exports.getAllBrands = async (req, res) => {
    const query = new ApiOptions(Brand.find(), req.query).filter().sort().limitFields().paginate();
    const brands = await query.operation;
    res.status(200).send({
        message: 'Brands retrieved successfully',
        data: {
            page: parseInt(req.query.page) || 1,
            count: brands.length,
            brands,
        }
    });
}

// @desc Get a brand by ID
// @route GET /api/brands/:id
// @access Public
exports.getBrandById = async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand)
        return next(new ApiError('Brand not found', 404));
    return res.status(200).send({
        message: 'Brand retrieved successfully',
        data: brand
    });
}

// @desc Update a brand by ID
// @route PUT /api/brands/:id
// @access Private
exports.updateBrand = async (req, res, next) => {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedBrand)
        return next(new ApiError('Brand not found', 404));
    return res.status(200).send({
        message: 'Brand updated successfully',
        data: updatedBrand
    });
}

// @desc Delete a brand
// @route DELETE /api/brands/:id
// @access Private
exports.deleteBrand = async (req, res, next) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand)
        return next(new ApiError('Brand not found', 404));
    return res.status(200).send({
        message: 'Brand deleted successfully',
        data: brand
    });
}