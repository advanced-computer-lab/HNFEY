const Reservation = require("../../../database/models/reservation");
const User = require("../../../database/models/user");
const Flight = require("../../../database/models/flight");

const fetchUserById = (_id) => User.findById(_id);

const fetchAll = () => Reservation.find({});

const fetchFlightById = (_id) => Flight.findById(_id);

const createReservation = async (reservation) => {
  return await Reservation.create(reservation);
};

const fetch = async (_id) => {
  return await Reservation.findOne({ _id });
};

const findReservation = async (reservation) => {
  return await Reservation.find(reservation);
};
const cancelReservation = (_id) => Flight.deleteOne({ _id });

const updateReservation = async (_id, updatedReservation) => {
  return await Reservation.findByIdAndUpdate(_id, updatedReservation);
};

module.exports = {
  fetchAll,
  fetch,
  fetchUserById,
  fetchFlightById,
  createReservation,
  findReservation,
  cancelReservation,
  updateReservation,
};
