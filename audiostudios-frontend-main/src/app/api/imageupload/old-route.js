// pages/api/uploadImage.js
import { NextResponse } from 'next/server'
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadImageToS3(file, fileName) {
  const resizedImageBuffer = await sharp(file)
    .resize(400, 500) // Specify your desired width or height for resizing
    .toBuffer();

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName, // Use the updated filename with the folder name
    Body: resizedImageBuffer,
    ContentType: "image/jpeg", // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const formData = await req.formData();
//       const file = formData.get("file");
//       if (!file) {
//         return res.status(400).json({ error: "File blob is required." });
//       }

//       const mimeType = file.type;
//       const fileExtension = mimeType.split("/")[1];

//       const folderName = "AudioStudio"; // Change the folder name as per your requirement
//       const fileName = `${folderName}/${Date.now()}-${uuid()}.${fileExtension}`;

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const uploadedFileName = await uploadImageToS3(buffer, fileName);

//       return res.json({ success: true, fileName: uploadedFileName });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return res.json({ message: "Error uploading image" });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }


async function POST(request, response) {
  try {
    //return NextResponse.json({ message: "Inside try" });

    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }
    //console.log("file",file)
     const mimeType = file.type;
     const fileExtension = mimeType.split("/")[1];

     const folderName = "AudioStudio"; // Change the folder name as per your requirement
     const fileName = `${folderName}/${Date.now()}-${uuid()}.${fileExtension}`;

     const buffer = Buffer.from(await file.arrayBuffer());
     const uploadedFileName = await uploadImageToS3(buffer, fileName);
     console.log("uploadedFileName",uploadedFileName)
     return NextResponse.json({ message: "Inside try" });

    // return NextResponse.json({ success: true, fileName: uploadedFileName });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ message: "Error uploading image" });
  }
}

module.exports = { POST };
