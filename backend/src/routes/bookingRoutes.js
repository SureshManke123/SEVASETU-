const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// Create Booking
router.post("/create", protect, bookingController.createBooking);

// My Bookings
router.get("/my", protect, bookingController.getMyBookings);

// Cancel Booking
router.put(
  "/cancel/:id",
  protect,
  bookingController.cancelBooking
);

// ================= EXPERT BOOKINGS =================

router.get(
  "/expert",
  protect,
  bookingController.getExpertBookings
);

router.put(
  "/accept/:id",
  protect,
  bookingController.acceptBooking
);
router.put(
  "/reject/:id",
  protect,
  bookingController.rejectBooking
);

router.put(
  "/complete/:id",
  protect,
  bookingController.completeBooking
);
module.exports = router;