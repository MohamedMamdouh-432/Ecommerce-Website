const router = require('express').Router();
const { asyncHandler } = require('../utils/utils');
const { AuthService, CategoryService } = require('../services/services');
const { CategoryValidator } = require('../middlewares/validators/validators');

router.route('/')
    .post(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        CategoryValidator.createCategoryValidator,
        asyncHandler(CategoryService.createCategory)
    )
    .get(asyncHandler(CategoryService.getAllCategories));

router.route('/:id')
    .get(CategoryValidator.getCategoryValidator, asyncHandler(CategoryService.getCategoryById))
    .put(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        CategoryValidator.updateCategoryValidator,
        asyncHandler(CategoryService.updateCategory)
    )
    .delete(
        // AuthService.protect,
        // AuthService.restrictTo('admin', 'manager'),
        CategoryValidator.deleteCategoryValidator,
        asyncHandler(CategoryService.deleteCategory)
    );

module.exports = router;
