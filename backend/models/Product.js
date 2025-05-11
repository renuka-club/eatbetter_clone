const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['meetha', 'namkeen']  // Only allow these two categories
  },
  imageUrl: {
    type: String,
    required: true
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  stock: {
    type: Number,
    required: true,
    default: 0
  }
});

// Add a static method to your Product schema for searching
productSchema.statics.searchProducts = function(query) {
  return this.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } }
    ]
  });
};

module.exports = mongoose.model('Product', productSchema);
