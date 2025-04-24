const User =  require('../models/User.js')

exports.getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  };

exports.updateProfile = async (req, res) => {
    try {
        const { name, address, profilePic } = req.body;
        const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, address, profilePic },
        { new: true }
        ).select("-password");
        res.json(user);
    } catch {
        res.status(500).json({ message: "Update failed" });
    }
};