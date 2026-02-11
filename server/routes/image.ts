import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageRouter = Router();

imageRouter.get("/api/sign-upload", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Parameters you want to sign (e.g., eager transformations, folders)
  const paramsToSign = {
    timestamp: timestamp,
    folder: "users/avatars", // Optional: Lock uploads to specific folder
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET,
  );

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: paramsToSign.folder,
  });
});
