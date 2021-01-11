const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
const { validationResult } = require("express-validator");
const isLogedin = require("../middleware/isLogedin");
const validator = require("../middleware/validator");
//IMPORTS

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

// import passports
require("./facebook")(router, passport, FacebookStrategy);
require("./passportLocal")(passport, LocalStrategy);

//end-----

//newuser
router.post("/newuser", validator.createUser, usersController.newUser);
//--end

//Local Strat
router.post("/login", validator.logIn, function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  passport.authenticate(
    "local",
    { failureFlash: true },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.json({
          success: true,
          message: "Successful Login",
          user: user,
        });
      });
    }
  )(req, res, next);
});
//-----end local

//facebook passport

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000");
  }
);
router.get("/logout", (req, res, next) => {
  req.logOut();
  req.session.destroy(function (err) {
    res.send("logetout");
  });
});
//----end-facebook

//Gets User Profile
router.get("/getuser", isLogedin, usersController.getUser);
router.put(
  "/updateprofile",
  isLogedin,
  validator.updateProfileValidator,
  usersController.editProfile
);
//---end
module.exports = router;
