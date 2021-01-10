const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
//IMPORTS

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

// import passports
require("./facebook")(router, passport, FacebookStrategy);
require("./passportLocal")(passport, LocalStrategy);
//end-----
router.post("/newuser", usersController.newUser);

//Local Strat
// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("http://localhost:3000");
//   }
// );
router.post("/login", function (req, res, next) {
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
router.get("/profile", usersController.Profile);
//end-facebook
module.exports = router;
