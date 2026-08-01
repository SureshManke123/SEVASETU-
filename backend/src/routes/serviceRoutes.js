const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
// ================= CREATE SERVICE =================

router.post(
  "/create",
  protect,
  authorize("expert", "admin"),
  serviceController.createService
);
// ================= SEARCH SERVICES =================

router.get("/search", serviceController.searchServices);

// ================= FILTER SERVICES =================

router.get("/filter", serviceController.filterServices);
// ================= GET ALL SERVICES =================

router.get("/", serviceController.getAllServices);

// ================= GET SINGLE SERVICE =================

router.get("/:id", serviceController.getServiceById);

// ================= UPDATE SERVICE =================

router.put(
  "/:id",
  protect,
  authorize("expert", "admin"),
  serviceController.updateService
);


// ================= DELETE SERVICE =================

router.delete(
  "/:id",
  protect,
  authorize("expert", "admin"),
  serviceController.deleteService
);


// ================= SEARCH SERVICES =================

exports.searchServices = async (req, res) => {
  try {
    const { keyword = "" } = req.query;

    const services = await Service.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate("provider", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = router;