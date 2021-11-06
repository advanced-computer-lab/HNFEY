const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    departureTerminal: {
      type: String,
      required: true,
    },
    arrivalTerminal: {
      type: String,
      required: true,
    },
    numberOfEconomySeats: {
      type: Number,
      required: true,
    },
    numberOfBusinessSeats: {
      type: Number,
      required: true,
    },
    numberOfAvailableEconomySeats: { //set in frontend number of aviable = number of total
      type: Number,
      required: false,
    },
    numberOfAvailableBusinessSeats: { //set in frontend number of aviable = number of total
      type: Number,
      required: false,
    },
    baggageAllowance: {
      type: Number,
      required: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

const Flight = mongoose.model("flight", flightSchema);
module.exports = Flight;
