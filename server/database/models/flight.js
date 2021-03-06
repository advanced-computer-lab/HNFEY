const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    departureDateTime: {
      type: Date,
      required: true,
    },
    departureDay: {
      type: Date,
      required: true,
    },
    arrivalDay: {
      type: Date,
      required: true,
    },
    arrivalDateTime: {
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
    numberOfAvailableEconomySeats: {
      //set in frontend number of aviable = number of total
      type: Number,
      required: true,
    },
    numberOfAvailableBusinessSeats: {
      //set in frontend number of aviable = number of total
      type: Number,
      required: true,
    },
    baggageAllowance: {
      type: Number,
      required: true,
    },
    economyPrice: {
      // type: mongoose.Types.Decimal128,
      type: Number,
      required: true,
    },
    businessPrice: {
      // type: mongoose.Types.Decimal128,
      type: Number,
      required: true,
    },
    seats: [
      {
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
    ],
  },
  { timestamps: true }
);

const Flight = mongoose.model("flight", flightSchema);
module.exports = Flight;
