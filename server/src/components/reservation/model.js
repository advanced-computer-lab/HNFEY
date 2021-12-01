const Reservation = require("../../../database/models/reservation");

const fetchAll = () => Reservation.find({});

const createReservation = async (reservation) => {
  return await Reservation.create(reservation);
};

const fetch = async (_id) => {
  return await Reservation.find({ _id });
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
  createReservation,
  findReservation,
  cancelReservation,
  updateReservation
};
