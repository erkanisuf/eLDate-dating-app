const express = require("express");
const picturesController = require("../controllers/picturesController");
const router = express.Router();
const isLogedin = require("../middleware/isLogedin");

//Images Multer Setup
const multer = require("multer");
const multerS3 = require("multer-s3"); // AWS MULTER

//AWS S3 CONFIG
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRET,
});
AWS.config.update({ region: "us-east-2" });

const options = {
  apiVersion: "2006-03-01",
  params: {
    Bucket: "erkanisuf",
  },
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: "v4",
};

const s3 = new AWS.S3(options);
const cloudStorage = multerS3({
  s3: s3,
  bucket: "erkanisuf",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (request, file, ab_callback) {
    ab_callback(null, { fieldname: file.originalname });
  },
  key: function (request, file, ab_callback) {
    let newFileName = Date.now() + "-" + file.originalname;
    ab_callback(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg and png files!"), false);
  }
};

const upload = multer({ storage: cloudStorage, fileFilter: fileFilter });
router.put(
  "/addprofilepicture",
  isLogedin,
  upload.single("profileImage"),
  picturesController.uploadProfilePicture
);
router.post(
  "/addtoalbum",
  isLogedin,
  upload.array("albumImage", 10),
  picturesController.uploadAlbums
);
module.exports = router;

// upload.single("productImage"),
