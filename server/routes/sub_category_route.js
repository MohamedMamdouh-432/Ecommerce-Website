const router = require('express').Router();
const { asyncHandler } = require('../utils/utils');
const { AuthService, SubCategoryService } = require('../services/services');
const { SubCategoryValidator } = require('../middlewares/validators/validators');

router
    .route('/')
    .post(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        SubCategoryValidator.createSubCategoryValidator,
        asyncHandler(SubCategoryService.createSubCategory)
    )
    .get(asyncHandler(SubCategoryService.getAllSubCategories));

router
    .route('/:id')
    .get(asyncHandler(SubCategoryService.getSubCategoryById))
    .put(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        SubCategoryValidator.updateSubCategoryValidator,
        asyncHandler(SubCategoryService.updateSubCategory)
    )
    .delete(
        // AuthService.protect,
        // AuthService.restrictTo('admin'),
        SubCategoryValidator.deleteSubCategoryValidator,
        asyncHandler(SubCategoryService.deleteSubCategory)
    );

module.exports = router;