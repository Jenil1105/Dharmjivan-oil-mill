const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    discounted_price: { type: Number, min: 0, default: 0 },
    available_quantity: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, trim: true },
    image_url: { type: String, trim: true },

    total_sold: { type: Number, default: 0, min: 0 },
    revenue_generated: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
