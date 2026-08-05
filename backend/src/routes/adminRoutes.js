const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

// ================= USER MANAGEMENT =================

router.get(
"/users",
protect,
authorize("admin"),
adminController.getAllUsers
);

router.get(
"/users/:id",
protect,
authorize("admin"),
adminController.getSingleUser
);

router.put(
"/users/:id/role",
protect,
authorize("admin"),
adminController.updateUserRole
);

router.delete(
"/users/:id",
protect,
authorize("admin"),
adminController.deleteUser
);

router.get(
  '/experts/pending',
  protect,
  authorize('admin'),
  adminController.getPendingExperts
);

router.put(
  '/experts/:id/approval',
  protect,
  authorize('admin'),
  adminController.approveExpert
);

// ================= SERVICE MANAGEMENT =================

router.get(
"/services",
protect,
authorize("admin"),
adminController.getAllServices
);

router.delete(
"/services/:id",
protect,
authorize("admin"),
adminController.deleteService
);

// ================= BOOKING MANAGEMENT =================

router.get(
"/bookings",
protect,
authorize("admin"),
adminController.getAllBookings
);

// ================= DASHBOARD =================

router.get(
"/dashboard",
protect,
authorize("admin"),
adminController.getDashboardStats
);

module.exports = router;
