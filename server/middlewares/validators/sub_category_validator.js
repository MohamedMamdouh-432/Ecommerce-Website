const slugify = require('slugify');
const { check, body } = require('express-validator');
const { validateResult } = require('../../utils/utils');

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required')
        .isLength({ min: 2 })
        .withMessage('Too short Subcategory name')
        .isLength({ max: 32 })
        .withMessage('Too long Subcategory name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('category')
        .notEmpty()
        .withMessage('subCategory must be belong to category')
        .isMongoId()
        .withMessage('Invalid Category id format'),
    validateResult,
];

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validateResult,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    body('name').optional().custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validateResult,
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format'),
    validateResult,
];