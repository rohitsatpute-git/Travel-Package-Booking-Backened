const express = require('express')
const { getMe, updateProfile } = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/me", verifyToken, getMe);
router.put("/update", verifyToken, updateProfile);

module.exports = router