const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  services: [{ type: String, enum: ["food", "accommodation"] }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Accepted" }, // could also use enum for future status control
}, { timestamps: true });

// export default mongoose.model("Booking", bookingSchema);
module.exports = mongoose.model('Booking', bookingSchema)