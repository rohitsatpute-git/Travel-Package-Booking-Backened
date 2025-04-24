const Booking  = require('../models/Booking.js')

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { packageId, services, totalPrice } = req.body;
    const newBooking = new Booking({
      user: userId,
      package: packageId,
      services,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("package")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Could not fetch bookings" });
  }
};