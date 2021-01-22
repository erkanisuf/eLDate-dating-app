const { check } = require("express-validator");
const User = require("../models/usersModel");

const checkAge = (value) => {
  var today = new Date();
  var birthDate = new Date(value);
  var age = today.getFullYear() - birthDate.getFullYear();

  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  console.log(age);
  if (age < 18) {
    throw new Error("You cant be underage 18 !");
  } else {
    return true;
  }
};
// Registration validator
exports.createUser = [
  check("email")
    .isEmail()
    .custom((value) => {
      return User.findByEmail(value).then((user) => {
        if (user.rows.length) {
          return Promise.reject("E-mail already in use");
        }
      });
    })
    .withMessage("FUCKYOU"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long"),
  check("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),

  check("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long"),
  check("age").isDate().custom(checkAge),
];
//--end

// Log in Validator
exports.logIn = [
  check("email").isEmail().withMessage("Please write email adress correctly!"),
  check("password").isLength({ min: 1 }).withMessage("Please write password!"),
];
//--end

// Update Profile
exports.updateProfileValidator = [
  check("sex").custom((value) => {
    if (value === "Male" || value === "Woman" || value === "Other") {
      return true;
    } else {
      throw new Error("Not valid sex !");
    }
  }),
  check("age").custom(checkAge),
  check("nickname")
    .isLength({ max: 7 })
    .withMessage("Maximum lenght of 5 chars"),
  check("fullname")
    .isLength({ min: 5 })
    .withMessage("Fullname minimum lenght of 5 !"),
  check("relationship").custom((value) => {
    if (
      value === "Single" ||
      value === "In relationship" ||
      value === "Married" ||
      value === "Other"
    ) {
      return true;
    } else {
      throw new Error("Select correct relationship status !");
    }
  }),
];

exports.checkChatMessage = [
  check("text")
    .isLength({ min: 1 })
    .withMessage("You cant send empty Messages!"),
];
//--end
