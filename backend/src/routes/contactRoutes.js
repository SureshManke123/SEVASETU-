const express = require("express");
const { body } = require("express-validator");
const { createMessage } = require("../controllers/contactController");
const { validate } = require("../middleware/validationMiddleware");

const router = express.Router();
router.post("/", body("email").isEmail().withMessage("Valid email is required"), validate, createMessage);
module.exports = router;
