const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  basePrice: { type: Number, required: true },
  services: [{ type: String }] // e.g., ["food", "accommodation"]
}, { timestamps: true });

module.exports = mongoose.model("Package", packageSchema);
