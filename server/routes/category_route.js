const router = require('express').Router();
const CategoryService = require('../services/category_service');

router.post('/', CategoryService.createCategory);
router.get('/', CategoryService.getCategories);
router.get('/:id', CategoryService.getCategoryById);

module.exports = router;
