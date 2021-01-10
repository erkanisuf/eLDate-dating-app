const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
module.exports = function (passport, LocalStrategy) {
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser(async (user, cb) => {
    const finduser = await User.findByID(user);
    cb(null, finduser.rows[0].user_id);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, cb) {
        try {
          const findUser = await User.findByEmail(email);

          if (!findUser.rows.length) {
            cb(null, false);
          } else {
            const checkPassword = await bcrypt.compareSync(
              password,
              findUser.rows[0].password
            );

            if (!checkPassword) {
              return cb(null, false);
            }

            return cb(null, findUser.rows[0].user_id);
          }
        } catch (err) {
          return cb(null, err);
        }
      }
    )
  );
};
