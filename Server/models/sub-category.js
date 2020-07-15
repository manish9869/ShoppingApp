const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema({
  categoryId: { type: String, required: true },
  subcategoryName: { type: String, required: true },
  subcategoryDescription: { type: String, required: true },
  IsActive: { type: Boolean, required: true },
  EnteredBy: { type: String },
  WhenEntered: { type: Date, required: true },
  ModifiedBy: { type: String },
  WhenModified: { type: Date },
});

module.exports = mongoose.model("SubCategoryData", SubCategorySchema);
