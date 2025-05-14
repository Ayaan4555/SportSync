const mongoose = require('mongoose');

const sportCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const SportCategory = mongoose.model('SportCategory', sportCategorySchema);

module.exports = SportCategory;