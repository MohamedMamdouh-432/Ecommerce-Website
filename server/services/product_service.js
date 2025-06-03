const { Product } = require('../models/models');
const { ApiOptions, ApiError, logger } = require('../utils/utils');

// @desc Create new products
// @route POST /api/products
// @access Private
exports.createProducts = async (req, res) => {
    const newProducts = await Product.create(req.body);
    res.status(201).send({
        message: 'Products created successfully',
        data: newProducts
    });
}

// @desc Get all products
// @route GET /api/products
// @access Public
exports.getAllProducts = async (req, res) => {
    const query = new ApiOptions(Product.find(), req.query)
        .filter()
        .search()
        .sort()
        .limitFields()
        .paginate();
    
    const products = await query.operation.lean();
    res.status(200).send({
        message: 'Products retrieved successfully',
        data: {
            page: parseInt(req.query.page) || 1,
            count: products.length,
            products,
        }
    });
}

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
exports.getProductById = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ApiError('Product not found', 404));
    return res.status(200).send({
        message: 'Product retrieved successfully',
        data: product
    });
}

// @desc Update a product by ID
// @route PUT /api/products/:id
// @access Private
exports.updateProduct = async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedProduct)
        return next(new ApiError('Product not found', 404));
    return res.status(200).send({
        message: 'Product updated successfully',
        data: updatedProduct
    });
}

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private
exports.deleteProducts = async (req, res, next) => {
    const ids = req.params.id.split(',');
    const delProducts = await Product.deleteMany({ _id: { $in: ids } });
    return res.status(200).send({
        message: 'Products deleted successfully',
        data: delProducts
    });
}