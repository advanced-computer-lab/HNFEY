const Flight = require("../../../database/models/flight");

const fetchAll = () => Flight.find({});

const createFlight = async (flight) => {
  return await Flight.create(flight);
};
const updateFlight = async (_id, updatedFlight) => {
  return await Flight.findByIdAndUpdate(_id, updatedFlight);
};

const findFlight = async (flight) => {
  return await Flight.find(flight);
};

const findUserFlights = async (flight) => {
  const flightClass = flight.class;
  const passengers = flight.passengers;
  delete flight.class;
  delete flight.passengers;
  if (flightClass === "Economy") {
    return await Flight.find({
      ...flight,
      numberOfAvailableEconomySeats: { $gte: passengers },
    });
  } else {
    return await Flight.find({
      ...flight,
      numberOfAvailableBusinessSeats: { $gte: passengers },
    });
  }
};

const findFlightById = (_id) => {
  return Flight.findById(_id);
};
const removeFlight = (_id) => Flight.deleteOne({ _id });

module.exports = {
  fetchAll,
  createFlight,
  updateFlight,
  findFlightById,
  findFlight,
  findUserFlights,
  removeFlight,
};
