require("dotenv").config();
const AWS = require("aws-sdk");
const sharp = require("sharp");

// name of your bucket here
const USER_BUCKET_NAME = process.env.USER_BUCKET_NAME;
const TEAM_BUCKET_NAME = process.env.TEAM_BUCKET_NAME;

const multer = require("multer");

//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file, isTeamUpload = false) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");

  const sharpenedBuffer = await sharp(buffer)
    .resize(1000, 1000, {
      fit: "cover",
    })
    .toBuffer();

  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const bucketName = isTeamUpload ? TEAM_BUCKET_NAME : USER_BUCKET_NAME;
  const uploadParams = {
    Bucket: bucketName,
    Key,
    Body: sharpenedBuffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const multiplePublicFileUpload = async (files, isTeamUpload = false) => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file, isTeamUpload);
    })
  );
};

// --------------------------- Prviate UPLOAD ------------------------

const singlePrivateFileUpload = async (file, isTeamUpload = false) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const bucketName = isTeamUpload ? TEAM_BUCKET_NAME : USER_BUCKET_NAME;
  const uploadParams = {
    Bucket: bucketName,
    Key,
    Body: buffer,
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Key;
};

const multiplePrivateFileUpload = async (files, isTeamUpload = false) => {
  return await Promise.all(
    files.map((file) => {
      return singlePrivateFileUpload(file, isTeamUpload);
    })
  );
};

const retrievePrivateFile = (key, isTeamUpload = false) => {
  let fileUrl;
  const bucketName = isTeamUpload ? TEAM_BUCKET_NAME : USER_BUCKET_NAME;
  if (key) {
    fileUrl = s3.getSignedUrl("getObject", {
      Bucket: bucketName,
      Key: key,
    });
  }
  return fileUrl || key;
};

// --------------------------- Delete UPLOADED FILE ------------------------
const deleteFileFromS3 = async (filename, isTeamUpload = false) => {
  const bucketName = isTeamUpload ? TEAM_BUCKET_NAME : USER_BUCKET_NAME;
  const deleteParams = {
    Bucket: bucketName,
    Key: filename,
  };
  await s3.deleteObject(deleteParams).promise();
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const fileFilter = (req, file, cb) => {
  const validFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (validFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File must be a JPEG, JPG, or PNG"));
  }
};

const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage, fileFilter: fileFilter }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage, fileFilter: fileFilter }).array(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singlePrivateFileUpload,
  multiplePrivateFileUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload,
  deleteFileFromS3,
};
