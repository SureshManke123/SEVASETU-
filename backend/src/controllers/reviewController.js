const Review = require("../models/Review");
const Service = require("../models/Service");

// ================= ADD REVIEW =================

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required",
      });
    }

    const service = await Service.findById(req.params.serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Prevent duplicate review by same user
    const existingReview = await Review.findOne({
      service: req.params.serviceId,
      user: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this service",
      });
    }

    const review = await Review.create({
      service: req.params.serviceId,
      user: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ================= GET SERVICE REVIEWS =================

exports.getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      service: req.params.serviceId,
    })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ================= DELETE REVIEW =================

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      review.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    await Review.findByIdAndDelete(req.params.reviewId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};