const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "CategoryData",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SubCategoryData",
  },
  productName: { type: String, required: true },
  productDescription: { type: String },
  keywords: { type: String, required: true },
  productMRPrice: { type: String, required: true },
  productSellingPrice: { type: String, required: true },
  Flavor: { type: String, required: true },
  Weight: { type: String, required: true },
  ISCODAvailable: { type: Boolean },
  image: { type: Array },
  IsActive: { type: Boolean, required: true },
  EnteredBy: { type: String },
  WhenEntered: { type: Date, required: true },
  ModifiedBy: { type: String },
  WhenModified: { type: Date },
});

module.exports = mongoose.model("ProductData", ProductSchema);
