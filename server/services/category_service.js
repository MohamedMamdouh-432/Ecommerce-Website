const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).send({
        message: 'Category created successfully',
        category: category
    });
}

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).send({
        message: 'Categories retrieved successfully',
        categories: categories
    });
}

exports.getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).send({ 
            message: 'Category not found'
        });
    }
    return res.status(200).send({
        message: 'Category retrieved successfully',
        category: category
    });
}
