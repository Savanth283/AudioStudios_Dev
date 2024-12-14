import { NextRequest, NextResponse } from "next/server";
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
  const resizedImageBuffer = await sharp(file).resize(400, 500).toBuffer();
  const imageMetadata = await sharp(file).metadata();

  const contentType = imageMetadata.format === 'jpeg' ? 'image/jpeg' : 'image/png';

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${process.env.NEXT_PUBLIC_AWS_INSIDE_PATH}/${fileName}`,
    Body: resizedImageBuffer,
    ContentType: contentType,
    ACL: 'public-read',
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    // const fileName = await uploadImageToS3(
    //   buffer,
    //   uuid() + "." + fileExtension
    // );

    // return NextResponse.json({ success: true, fileName });
    const fileName = uuid() + "." + fileExtension;

    const uploadedFileName = await uploadImageToS3(buffer, fileName);

    return NextResponse.json({ success: true, fileName: uploadedFileName, message: "uploading image success" });
    // Returns the fileName you received after uploading to S3
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}