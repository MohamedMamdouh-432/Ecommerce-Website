const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category must be unique'],
        minlength: [3, 'Too short category name'],
        maxlength: [32, 'Too long category name'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,
}, { timestamps: true });

categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name);
    next();
});

categorySchema.pre('findOneAndUpdate', function(next) {
    if (this._update.name) {
        this._update.slug = slugify(this._update.name);
    }
    next();
});

module.exports = model('Category', categorySchema);