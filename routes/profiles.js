const express = require("express");
const profileController = require("../controllers/profileController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");

router.get("/allprofiles", isLogedin, profileController.allProfiles);
router.get("/allprofiles/:id", isLogedin, profileController.singleProfile);

module.exports = router;
