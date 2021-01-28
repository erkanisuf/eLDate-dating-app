const express = require("express");
const profileController = require("../controllers/profileController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");

router.get("/allprofiles", isLogedin, profileController.allProfiles);
router.get("/allprofiles/:id", isLogedin, profileController.singleProfile);
router.get("/latestprofile", profileController.latestProfiles);

module.exports = router;
