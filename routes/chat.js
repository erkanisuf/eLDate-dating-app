const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");
const validator = require("../middleware/validator");
//IMPORTS

// GET /feed/posts
router.post(
  "/startconversation/:id",
  isLogedin,
  validator.checkChatMessage,
  chatController.newChat
);

router.get(
  "/getmyconversations",
  isLogedin,

  chatController.getMyConversations
);

module.exports = router;
