const slugify = require('slugify');
const { check, body } = require('express-validator');
const { validateResult } = require('../../utils/utils');

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category required')
        .isLength({ min: 3 })
        .withMessage('Too short category name')
        .isLength({ max: 32 })
        .withMessage('Too long category name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validateResult,
];

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validateResult,
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validateResult,
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validateResult,
];