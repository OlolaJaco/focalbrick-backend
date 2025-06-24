import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  description: String,
  detailedDescription: String,
  price: String,
  bedrooms: Number,
  bathrooms: Number,
  area: String,
  light: String,
  parking: Boolean,
  type: String,
  offer: String,
  status: String,
  inspection: String,
  images: [String], // Array of image paths
  agentName: String,
  agentImage: String,
});


export const Property = mongoose.model("Property", propertySchema);