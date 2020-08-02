const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CategorySchema = mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  categoryDescription: { type: String, required: true },
  image: { type: String },
  IsActive: { type: Boolean, required: true },
  EnteredBy: { type: String },
  WhenEntered: { type: Date, required: true },
  ModifiedBy: { type: String },
  WhenModified: { type: Date },
});

CategorySchema.plugin(uniqueValidator);
module.exports = mongoose.model("CategoryData", CategorySchema);
