const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  departingFlightId: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  arrivalFlightId: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  numberOfPassengers: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
    enum: ["Economy", "Business"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Reserved", "Cancelled", "Pending"],
  },
});
const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;
