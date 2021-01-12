const express = require("express");
const usersController = require("../controllers/chatController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");
//IMPORTS

// GET /feed/posts
router.get("/flowers", isLogedin);

module.exports = router;
