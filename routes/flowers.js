const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
//IMPORTS

// GET /feed/posts
router.get("/flowers", usersController.getFLowers);

module.exports = router;
