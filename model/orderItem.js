import mongoose from "mongoose";

import Orders from "@/model/orders";

import Product from "@/model/product";

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Product",
    },
    product_name: {
      type: String,
      required: true,
    },

    unit_price: {
      type: Number,
      required: true,
    },

    qty: {
      type: Number,
      required: true,

      min: 1,
    },

    product_size: {
      type: Object,
      default: null,
    },

    product_option: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.OrderItem ||
  mongoose.model("OrderItem", orderItemSchema);