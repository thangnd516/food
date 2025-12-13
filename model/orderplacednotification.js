import mongoose from "mongoose";

import User from "./user";

import Orders from "@/model/orders";

const OrderPlacedNotificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", OrderPlacedNotificationSchema);