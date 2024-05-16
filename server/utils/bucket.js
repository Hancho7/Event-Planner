const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

module.exports = {
  saveToBucket: async (file) => {
    console.log("File in the save bucket\n\n", file);

    try {
      if (!file || !Buffer.isBuffer(file.buffer)) {
        throw new Error("Invalid file buffer");
      }

      // Resize image if required
      const resizedImageBuffer = await sharp(file.buffer)
        .resize(720, 540)
        .toBuffer();

      // Generate a unique key for each file
      const uniqueKey = `${uuidv4()}-${file.originalname}`;

      const uploadFileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: uniqueKey,
        Body: resizedImageBuffer,
      };

      const putObjectCommand = new PutObjectCommand(uploadFileParams);
      await s3.send(putObjectCommand);

      console.log("Uploaded file key:", uniqueKey);
      return { key: uniqueKey };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteFromBucket: async (key) => {
    try {
      const deleteObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      };

      const deleteObjectCommand = new DeleteObjectCommand(deleteObjectParams);
      const deleted = await s3.send(deleteObjectCommand);
      console.log("deleted", deleted);

      console.log("Deleted file key:", key);
      return { key, status: "success" };
    } catch (error) {
      console.error("Error deleting file:", error);
      return { key, status: "error", error: error.message };
    }
  },

  getFromBucket: async (key) => {
    try {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      };
      const command = new GetObjectCommand(getObjectParams);
      const link = await getSignedUrl(s3, command, { expiresIn: 3600 });

      console.log("Generated signed URL for key:", key);
      return { key, url: link, status: "success" };
    } catch (error) {
      console.error("Error getting file:", error);
      return { key, status: "error", error: error.message };
    }
  },
};
