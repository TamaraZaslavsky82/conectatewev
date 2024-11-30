const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // Almacenará la URL de Cloudinary
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
