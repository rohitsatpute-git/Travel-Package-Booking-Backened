const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js')
const bookingRoutes = require('./routes/bookingRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173']
}));
app.use(express.json());
app.use('/api', authRoutes);
app.use("/api/packages", require("./routes/packageRoutes.js"));
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

app.get('/test', (req, res) => res.send('<h1>working</h1>'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));