const pool = require("../db");

exports.uploadProfilePicture = async (req, res) => {
  try {
    const changeprofilepic = await pool.query(
      "UPDATE  profile SET images[0] = $1 WHERE userlog_id=$2",
      [req.file.location, req.user]
    );
    res.status(200).json({ message: "Updated", data: changeprofilepic.rows });
  } catch (err) {
    console.log(err);
  }
};

exports.uploadAlbums = async (req, res) => {
  const waitingArray = [];
  req.files.map((el) => waitingArray.push(el.location));
  console.log(waitingArray);

  try {
    waitingArray.map(async (el) => {
      const insertToAlbums = await pool.query(
        `UPDATE profile
     SET album = array_append(album, $2)
      WHERE userlog_id=$1`,
        [req.user, el]
      );
    });
    // const insertToAlbums = await pool.query(
    //   `UPDATE profile
    //   SET album = $2
    //   WHERE userlog_id=$1`,
    //   [req.user, waitingArray]
    // );
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.log(err);
  }
};

// `UPDATE profile
//       SET album = array_append(album, $2)
//       WHERE userlog_id=$1`
