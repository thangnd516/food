import mongoose from "mongoose";

import Product from "./product";

const productGallerySchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ProductGallery ||
  mongoose.model("ProductGallery", productGallerySchema);