const router = require('express').Router();
const { asyncHandler } = require('../utils/utils');
const { AuthService, ProductService } = require('../services/services');
const { ProductValidator } = require('../middlewares/validators/validators');

router.route('/')
    .post(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        ProductValidator.createProductValidator,
        asyncHandler(ProductService.createProducts)
    )
    .get(asyncHandler(ProductService.getAllProducts));

router.route('/:id')
    .get(ProductValidator.getProductValidator, asyncHandler(ProductService.getProductById))
    .put(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        ProductValidator.updateProductValidator,
        asyncHandler(ProductService.updateProduct)
    )
    .delete(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        ProductValidator.deleteProductValidator,
        asyncHandler(ProductService.deleteProducts)
    );

module.exports = router;
