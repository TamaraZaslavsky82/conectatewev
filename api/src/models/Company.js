const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    horario: { type: String },
    image: [{ type: String }], // Array de URLs de imágenes en Cloudinary
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }], // Relación con Categorías
    type: { type: String },
    name: { type: String },
    phone: { type: String },
    status: { type: String },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    links: {
      website: { type: String },
      instagram: { type: String },
      facebook: { type: String },
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
