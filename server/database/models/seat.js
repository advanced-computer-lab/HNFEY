const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema(
  {
    flightId: { type: Schema.Types.ObjectId, ref: "flight", required: true },

    seatNumber: {
      type: String,
      required: true,
    },
    reserved: {
      type: Boolean,
      required: true,
    },
    class: {
      type: String,
      required: true,
      enum: ["Economy", "Business"],
    },
  },
  { timestamps: true }
);

const seat = mongoose.model("seat", seatSchema);
module.exports = seat;
