const slugify = require('slugify');
const { check, body } = require('express-validator');
const { validateResult } = require('../../utils/utils');

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand required')
        .isLength({ min: 3 })
        .withMessage('Too short brand name')
        .isLength({ max: 32 })
        .withMessage('Too long brand name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validateResult,
];

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validateResult,
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id format'),
    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validateResult,
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validateResult,
];