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

router.post(
  "/newuser",
  validator.createUser,
  usersController.newUser,
  function (req, res, next) {
    passport.authenticate(
      "local",
      { failureFlash: true },
      function (err, user, info) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: "Wrong information!" });
        }
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }

          res.status(200).json({ message: "sucsessfuly created user!" });
          // res
          //   .writeHead(200, {
          //     "Set-Cookie": "token=" + req.user,
          //     "Access-Control-Allow-Credentials": "true",
          //   })
          //   .send();
        });
      }
    )(req, res, next);
  }
);

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
        return res.status(401).json({ message: "Wrong information!" });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        res
          .writeHead(200, {
            "Set-Cookie": "token=" + req.user,
            "Access-Control-Allow-Credentials": "true",
          })
          .send();
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
  passport.authenticate("facebook", {
    failureRedirect: process.env.FACEBOOK_REDIRECT,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.FACEBOOK_FAIL);
  }
);
router.get("/logout", (req, res, next) => {
  req.logOut();
  req.session.destroy(function (err) {
    res.send("logetout");
  });
});
//----end-facebook

//FORGOT PASSWORD  - Sends Email to COnfirm
router.put(
  "/forgotpassword",
  validator.checkForgotPasswordEmail,
  usersController.forgotPassword
);
//RESET PASSWORD
router.put(
  "/resetpassword/:id",
  validator.checkResetPassowrds,
  usersController.resetPassword
);
//---end

//Gets User Profile
router.get("/getuser", isLogedin, usersController.getUser);
//Update user Profile
router.put(
  "/updateprofile",
  isLogedin,
  validator.updateProfileValidator,
  usersController.editProfile
);
//---end
//GET my album
router.get("/getmyalbum", isLogedin, usersController.getAlbums);
//---end
module.exports = router;
