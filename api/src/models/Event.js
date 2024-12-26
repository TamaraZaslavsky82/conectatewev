const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    images: [{ type: String }], // Array de URLs de imágenes en Cloudinary
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventsSchema);
