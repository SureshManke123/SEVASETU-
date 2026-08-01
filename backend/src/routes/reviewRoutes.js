const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { protect, authorize } = require("../middleware/authMiddleware");

// ================= ADD REVIEW =================

router.post(
  "/:serviceId",
  protect,
  authorize("user", "expert", "admin"),
  reviewController.addReview
);

// ================= GET SERVICE REVIEWS =================

router.get(
  "/:serviceId",
  reviewController.getServiceReviews
);

// ================= DELETE REVIEW =================

router.delete(
  "/:reviewId",
  protect,
  reviewController.deleteReview
);

module.exports = router;