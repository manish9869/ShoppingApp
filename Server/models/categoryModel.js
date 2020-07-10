const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  categoryDescription: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("CategoryData", userSchema);
