const Package = require("../models/Package.js");
const User = require('../models/User.js')
const Booking = require('../models/Booking.js')

// GET all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};

// CREATE a package
exports.createPackage = async (req, res) => {
  try {
    const { from, to, startDate, endDate, basePrice, services } = req.body;
    const newPackage = new Package({ from, to, startDate, endDate, basePrice, services });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ error: "Failed to create package" });
  }
};

// UPDATE a package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Package.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Package not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update package" });
  }
};

// DELETE a package
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Package.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Package not found" });
    res.status(200).json({ message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete package" });
  }
};

exports.userBookings = async(req, res) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'user',
          as: 'bookings',
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users and bookings' });
  }
}

exports.pakageStatus = async(req, res) => {
  try {
    const today = new Date();

    const [completed, active, upcoming] = await Promise.all([
      Package.find({ endDate: { $lt: today } }),
      Package.find({ startDate: { $lte: today }, endDate: { $gte: today } }),
      Package.find({ startDate: { $gt: today } }),
    ]);

    res.json({ completed, active, upcoming });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch package status' });
  }

}

exports.bookingPerPackage = async(req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: '$package',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'packages',
          localField: '_id',
          foreignField: '_id',
          as: 'packageInfo',
        },
      },
      {
        $unwind: '$packageInfo',
      },
      {
        $project: {
          packageId: '$_id',
          packageName: '$packageInfo.name',
          count: 1,
        },
      }
    ]);
    console.log('result', result)
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to count bookings per package' });
  }
}
