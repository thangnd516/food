import mongoose from "mongoose";

const reservationTimeSchema = new mongoose.Schema(
  {
    start_time: {
      type: String,
      required: true,
    },

    end_time: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ReservationTime ||
  mongoose.model("ReservationTime", reservationTimeSchema);