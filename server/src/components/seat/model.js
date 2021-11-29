const Seat = require("../../../database/models/seat");

const fetchAll = () => Seat.find({});

const createSeat = async (seat) => {
  return await Seat.create(seat);
};

const createSeatsBulk = async (seats) => {
  return await Seat.insertMany(seats);
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
  return Seat.findById(_id);
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
  createSeatsBulk,
};
