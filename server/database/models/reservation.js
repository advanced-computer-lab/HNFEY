const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

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
  arrvivalFlightId: {
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
    enum: ["Economy", "Buisness"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Reserved", "Cancelled", "Pending"],
  },
  index: {
    type: Number,
  }
});
reservationSchema.plugin(AutoIncrement, {id:'index_seq', inc_field: 'index'});
const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;
