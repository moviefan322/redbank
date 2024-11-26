import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function handleUpload(file, resourceType = "auto") {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: resourceType,
    });
    return res;
  }
  

  export async function uploadPDF(req, res) {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  
      // Use "raw" resource type for PDF uploads
      const cldRes = await handleUpload(dataURI, "raw");
      res.json(cldRes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
