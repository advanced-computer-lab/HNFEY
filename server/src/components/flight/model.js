const Flight = require("../../../database/models/flight");

const fetchAll = () => Flight.find({});

const createFlight = async (flight) => {
  return await Flight.create(flight);
};

module.exports = {
  fetchAll,
  createFlight,
};
