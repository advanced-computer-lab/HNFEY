const Flight = require("../../../database/models/flight");

const findFlight = async (flight) => {
  return await Flight.find(flight);
};

module.exports = {
  findFlight,
};
