import mongoose from "mongoose";

import Product from "./product";
const productOptionSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ProductOption ||
  mongoose.model("ProductOption", productOptionSchema);