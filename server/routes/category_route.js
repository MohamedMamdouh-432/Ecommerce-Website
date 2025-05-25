const router = require('express').Router();
const CategoryService = require('../services/category_service');
const { asyncHandler } = require('../utils/utils');

router.route('/')
    .post(asyncHandler(CategoryService.createCategory))
    .get(asyncHandler(CategoryService.getCategories));

router.route('/:id')
    .get(asyncHandler(CategoryService.getCategoryById))
    .put(asyncHandler(CategoryService.updateCategory))
    .delete(asyncHandler(CategoryService.deleteCategory));

module.exports = router;
