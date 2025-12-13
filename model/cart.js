import mongoose from "mongoose";

import Product from "./product";

import ProductSize from "@/model/productsize";

import ProductOption from "@/model/productoption";

import User from "@/model/user";

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    sizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSize",
      required: true,
    },

    optionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductOption",
      },
    ],

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,

      enum: ["in-cart", "ordered"],
      defualt: "in-cart",
    },
  },

  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);