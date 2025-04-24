const express = require("express");
const router = express.Router();
const { getAllPackages, createPackage, updatePackage, deletePackage, userBookings, pakageStatus, bookingPerPackage } = require("../controllers/packageController.js");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllPackages);
router.get('/user-bookings', userBookings);
router.get('/package-status', pakageStatus);
router.get('/bookings-per-package', bookingPerPackage)
router.post("/", verifyToken, isAdmin, createPackage);
router.put("/:id", verifyToken, isAdmin, updatePackage);
router.delete("/:id", verifyToken, isAdmin, deletePackage);

module.exports = router;
