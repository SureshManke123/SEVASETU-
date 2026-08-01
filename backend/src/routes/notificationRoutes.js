const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

// ================= GET USER NOTIFICATIONS =================

router.get(
"/",
protect,
notificationController.getNotifications
);

// ================= MARK AS READ =================

router.put(
"/read/:id",
protect,
notificationController.markAsRead
);

// ================= DELETE NOTIFICATION =================

router.delete(
"/:id",
protect,
notificationController.deleteNotification
);

module.exports = router;
