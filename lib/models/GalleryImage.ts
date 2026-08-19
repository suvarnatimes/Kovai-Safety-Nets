import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage extends Document {
  imageUrl: string;
  publicId: string;
  caption?: string;
  uploadedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Public ID is required for deletion"],
    },
    caption: {
      type: String,
      default: "",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "galleryImages",
  }
);

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage || mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);

export default GalleryImage;
