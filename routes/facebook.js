const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
module.exports = function (app, passport, FacebookStrategy) {
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser(async (user, cb) => {
    const finduser = await User.findByID(user);
    cb(null, finduser.rows[0].user_id);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        callbackURL: "/users/auth/facebook/callback",
        profileFields: ["id", "displayName", "email", "birthday"],
      },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        try {
          const findUser = await User.findByEmail(profile._json.email);

          if (!findUser.rows.length) {
            let hashedPasssword = await bcrypt.hash(profile._json.id, 12);
            const newuser = await new User(
              profile._json.id,
              hashedPasssword,
              profile._json.email,
              2
            );
            const saveNew = await newuser.save();

            const returnvalue = saveNew.rows[0].user_id;
            return cb(null, returnvalue);
          } else {
            const checkPassword = await bcrypt.compareSync(
              profile._json.id,
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
