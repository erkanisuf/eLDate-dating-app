const pool = require("../db");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
exports.arrayMatches = async (req, res, next) => {
  try {
    const getProfiles = await pool.query(
      "SELECT userlog_id,fullname,nickname,age,sex,images FROM profile ",
      []
    );
    const defilter = getProfiles.rows.filter((el) => el.userlog_id != req.user);
    const mixedArr = shuffle(defilter);

    return res.status(200).json(mixedArr);
  } catch (err) {
    console.log(err);
  }
};

exports.insertMatches = async (req, res, next) => {
  try {
    console.log(req.body.shown_user);
    const checkdupe = await pool.query(
      `SELECT * FROM matches WHERE user_id= $1 AND shown_user_id= $2
  `,
      [req.user, req.body.shown_user]
    );
    if (!checkdupe.rows.length) {
      const insertInmatches = await pool.query(
        `INSERT INTO matches(user_id,shown_user_id,liked)
      VALUES
     ($1, $2, $3)`,
        [req.user, req.body.shown_user, "YES"]
      );
      return res.status(200).json(insertInmatches.rows[0]);
    } else {
      return res.status(200).json({ message: "updated" });
    }
  } catch (err) {
    console.log(err);
  }
};

// select A.user_id A, B.user_id B from
// matches as A
// inner join
// matches as B
// on A.user_id = B.shown_user_id
// where A.user_id = B.shown_user_id
// and B.user_id = A.shown_user_id
// and a.user_id < b.user_id

exports.getMymatches = async (req, res, next) => {
  try {
    const checkdupe = await pool.query(
      `select A.user_id A, B.user_id B ,C.profile_id from
      matches as A
      inner join profile as C
      on A.user_id = C.userlog_id
      inner join 
      matches as B
      on A.user_id = B.shown_user_id
      where A.user_id = B.shown_user_id
      and B.user_id = A.shown_user_id
      and (a.user_id=$1) < (b.user_id=$1)
    `,
      [req.user]
    );
    console.log(checkdupe.rows);
    res.status(200).json(checkdupe.rows);
  } catch (err) {
    console.log(err);
  }
};
