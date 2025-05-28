const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Sub Category must be unique'],
      minlength: [2, 'To short Sub Category name'],
      maxlength: [32, 'To long Sub Category name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Sub Category must be belong to parent category'],
    },
  },
  { timestamps: true }
);

subCategorySchema.pre('save', function(next) {
    this.slug = slugify(this.name);
    next();
});

subCategorySchema.pre('findOneAndUpdate', function(next) {
    if (this._update.name) {
        this._update.slug = slugify(this._update.name);
    }
    next();
});

module.exports = model('SubCategory', subCategorySchema);
