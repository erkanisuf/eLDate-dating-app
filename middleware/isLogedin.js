module.exports = function (req, res, next) {
  const token = req.header("auth_token");
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send({ message: "No premission!. Please sign in!" });
  }
};
