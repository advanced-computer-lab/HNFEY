const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema(
  {
    flightId: { type: Schema.Types.ObjectId, ref: "Flight", required: true },

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

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
