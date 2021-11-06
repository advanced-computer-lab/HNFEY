const Flight = require("../../../database/models/flight");

const fetchAll = () => Flight.find({});

const createFlight = async (flight) => {
  return await Flight.create(flight);
};
const updateFlight = async (_id,updatedFlight) => {
  return await Flight.findByIdAndUpdate(_id,updatedFlight);
};

module.exports = {
  fetchAll,
  createFlight,
  updateFlight,
};
