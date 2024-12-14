import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server'


async function POST(request, response) {
    console.log("request request",request)
    try {

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
          });
      
          const { image } = request.file; // Assuming you're sending the image as a base64 encoded string

          console.log("image image",request.files.image)
          // Set the S3 upload parameters
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `AudioStudio/${Date.now()}_${image.name}`, // Use the file name for the S3 object key
            Body: image.data,
            ContentType: image.mimetype,
            ACL: 'public-read', // Make the uploaded image publicly accessible
          };
      
          // Upload the image to S3
          const command = new PutObjectCommand(params);
          const result = await s3Client.send(command);
      
          // Return the image URL

          //res.status(200).json({ imageUrl: result.Location });
          console.log("result",result)
     
       return NextResponse.json({ message: "Inside try", data: result });
  
      // return NextResponse.json({ success: true, fileName: uploadedFileName });
    } catch (error) {
      console.error("Error uploading image:", error);
      return NextResponse.json({ message: "Error uploading image" });
    }
  }
  
  module.exports = { POST };
  