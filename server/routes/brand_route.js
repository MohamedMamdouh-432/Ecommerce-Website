const router = require('express').Router();
const { asyncHandler } = require('../utils/utils');
const { AuthService, BrandService } = require('../services/services');
const { BrandValidator } = require('../middlewares/validators/validators');

router.route('/')
    .post(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        BrandValidator.createBrandValidator,
        asyncHandler(BrandService.createBrand)
    )
    .get(asyncHandler(BrandService.getAllBrands));

router.route('/:id')
    .get(BrandValidator.getBrandValidator, asyncHandler(BrandService.getBrandById))
    .put(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        BrandValidator.updateBrandValidator,
        asyncHandler(BrandService.updateBrand)
    )
    .delete(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        BrandValidator.deleteBrandValidator,
        asyncHandler(BrandService.deleteBrand)
    );

module.exports = router;
