const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const contactRoutes = require("./src/routes/contactRoutes");


dotenv.config();
require("./src/config/cloudinary");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= DATABASE =================

connectDB();

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact", contactRoutes);
// ================= HOME ROUTE =================

app.get("/", (req, res) => {
  res.send("🚀 Seva Setu API Running...");
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
