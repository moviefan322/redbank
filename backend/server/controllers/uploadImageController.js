import cloudinary from "cloudinary";

// Function to handle image upload
export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
