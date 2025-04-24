const express = require('express');
const {createBooking, getMyBookings} = require('../controllers/bookingController.js')
const { verifyToken } = require('../middleware/authMiddleware.js')

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/me", verifyToken, getMyBookings);

module.exports = router
