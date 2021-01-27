const express = require("express");
const notificationsController = require("../controllers/notificationsController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");

router.get(
  "/getmsgnotifications",
  isLogedin,
  notificationsController.getMSGNotifications
);
router.put(
  "/readmsgnotifications",
  isLogedin,
  notificationsController.readMessages
);

module.exports = router;
