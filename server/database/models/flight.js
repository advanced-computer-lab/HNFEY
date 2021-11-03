const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: false,
    },
    arrivalTime: {
        type: Date,
        required: false,
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
    numberOfAvailableEconomySeats: {
        type: Number,
        required: true,
    },
    numberOfAvailableBusinessSeats: {
        type: Number,
        required: true,
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