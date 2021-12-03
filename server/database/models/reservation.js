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
        class: {
          type: String,
          required: true,
        },
        seatNumber: {
          type: String,
          required: true,
        },
      },
      returnSeat: {
        class: {
          type: String,
          required: true,
        },
        seatNumber: {
          type: String,
          required: true,
        },
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
  index: {
    type: Number,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
});
reservationSchema.plugin(AutoIncrement, {id:'index_seq', inc_field: 'index'});
const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;
