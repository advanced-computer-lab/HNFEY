const Flight = require("../../../database/models/flight");

const fetchAll = () => Flight.find({});

const createFlight = async (flight) => {
  // let response = Flight.findFlight(flight.flightNumber);
  // console.log(response);
  // if(response.message == "Flights available"){
  //   alert('This flight number already exists');
  // }
  return await Flight.create(flight);
};
const updateFlight = async (_id, updatedFlight) => {
  return await Flight.findByIdAndUpdate(_id, updatedFlight);
};

const findFlight = async (flight) => {
  return await Flight.find(flight);
};

const fetchOneFlight = async (flight) => {
  return await Flight.findOne(flight);
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

const findFlightById = (flight) => {
  if (flight.class) {
    if (flight.class === "Economy" && flight.passengers) {
      return Flight.findOne({
        _id: flight.id,
        numberOfAvailableEconomySeats: { $gte: flight.passengers },
      });
    } else if (flight.class === "Business" && flight.passengers) {
      return Flight.findOne({
        _id: flight.id,
        numberOfAvailableBusinessSeats: { $gte: flight.passengers },
      });
    }
  }
  return Flight.findById(flight);
};
const removeFlight = (_id) => Flight.deleteOne({ _id });

module.exports = {
  fetchAll,
  createFlight,
  fetchOneFlight,
  updateFlight,
  findFlightById,
  findFlight,
  findUserFlights,
  removeFlight,
};
