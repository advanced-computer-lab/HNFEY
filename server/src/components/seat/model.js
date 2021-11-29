const Seat = require("../../../database/models/seat");

const fetchAll = () => Seat.find({});

const createSeat = async (seat) => {
  return await Seat.create(seat);
};
const updateSeat = async (_id, updatedSeat) => {
  return await Seat.findByIdAndUpdate(_id, updatedSeat);
};

const findSeat = async (seat) => {
  return await Seat.find(seat);
};

const findUserSeats = async (seat) => {
  return await Seat.find({ seat });
};

const findSeatById = (_id) => {
  return Seat.findById(seat);
};
const removeSeat = (_id) => Seat.deleteOne({ _id });

module.exports = {
  fetchAll,
  createSeat,
  updateSeat,
  findSeatById,
  findSeat,
  findUserSeats,
  removeSeat,
};
