const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  categoryDescription: { type: String, required: true },
  IsActive:{type:Boolean},
  EnteredBy:{type:String},
  WhenEntered:{type:Date},
  ModifiedBy:{type:String},
  WhenModified:{type:Date},
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("CategoryData", userSchema);
