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
  returnFlightId: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },

  passengers: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      passportNumber: {
        type: String,
        required: true,
      },
      departureSeat: {
        type: String,
        required: true,
      },
      returnSeat: {
        type: String,
        required: true,
      },
    },
  ],
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
