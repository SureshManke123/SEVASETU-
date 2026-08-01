const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

// ================= REGISTER =================

router.post(
  "/register",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  validate,
  authController.register
);

router.post(
  "/expert-register",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  validate,
  authController.registerExpert
);

// ================= LOGIN =================

router.post("/login", authController.login);

// ================= PROFILE =================

router.get("/me", protect, authController.getMe);

router.put("/update-profile", protect, authController.updateProfile);

// ================= ROLE TEST ROUTES =================

router.get(
"/admin",
protect,
authorize("admin"),
(req, res) => {
res.json({
success: true,
message: "Welcome Admin",
});
}
);

router.get(
"/expert",
protect,
authorize("expert", "admin"),
(req, res) => {
res.json({
success: true,
message: "Welcome Expert",
});
}
);

router.get(
"/user",
protect,
authorize("user", "expert", "admin"),
(req, res) => {
res.json({
success: true,
message: "Welcome User",
});
}
);

module.exports = router;
