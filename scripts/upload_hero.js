import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
  try {
    const res = await cloudinary.uploader.upload('src/assets/hero-bg-team.jpg', {
      folder: 'system',
      public_id: 'hero-bg-team'
    });
    console.log("CLOUDINARY_URL=" + res.secure_url);
  } catch(e) {
    console.error(e);
  }
}
run();
