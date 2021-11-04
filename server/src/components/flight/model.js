const Flight = require("../../../database/models/flight");

const fetchAll = () => Flight.find({});

const createFlight = async (flight) => {
  return await Flight.create(flight);
};

const findFlight = async (flight) => {
  return await Flight.find(flight);
};
const removeFlight = (_id) => Flight.deleteOne({ _id });

module.exports = {
  fetchAll,
  createFlight,
  findFlight,
  removeFlight,
};
