import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const handle = formData.get("handle");
    const desc = formData.get("desc");

    if (!file || !handle) {
      return NextResponse.json({ success: false, error: "File or handle missing" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "fittree_uploads",
       format: "webp",
       quality: "auto", 
       crop: "limit",
       width: 160,
       height: 160,
    });

   

    return NextResponse.json({ success: true, url: uploadResult.secure_url ,  public_id: uploadResult.public_id  });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
