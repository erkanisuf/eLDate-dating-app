const express = require("express");
const matchController = require("../controllers/MatchController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");

router.get("/profiles", isLogedin, matchController.arrayMatches);
router.post("/insertmatch", isLogedin, matchController.insertMatches);
router.get("/getmymatches", isLogedin, matchController.getMymatches);

module.exports = router;
