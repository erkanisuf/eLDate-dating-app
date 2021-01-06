const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
//IMPORTS

// GET /feed/posts
router.get("/users", usersController.getUser);
router.post("/newuser", usersController.newUser);
router.post("/login", usersController.logIn);
module.exports = router;
