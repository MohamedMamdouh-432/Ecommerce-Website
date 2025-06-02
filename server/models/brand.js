const { Schema, model } = require('mongoose');
const slugify = require('slugify');
const Env = require('../config/env');

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short Brand name'],
      maxlength: [32, 'Too long Brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${Env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post('init', (doc) => setImageUrl(doc));
brandSchema.post('save', (doc) => setImageUrl(doc));
brandSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
})

module.exports = model('Brand', brandSchema);
