const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema(
  {
    flightId: { type: Schema.Types.ObjectId, ref: "Flight" },

    seatNumber: {
      type: String,
      required: true,
    },
    reserved: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model("seat", seatSchema);
module.exports = Seat;
