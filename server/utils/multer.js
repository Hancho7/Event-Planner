const multer = require("multer");

const memory = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // List of acceptable MIME types
  const acceptableMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  // Check if the file's MIME type is acceptable
  if (acceptableMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false); // Reject the file
  }
};

const upload = multer({ storage: memory, fileFilter: fileFilter });

module.exports = { upload };
