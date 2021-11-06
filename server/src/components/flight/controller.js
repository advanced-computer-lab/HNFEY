const model = require("./model");

const fetchAll = async (req, res, next) => {
  try {
    const flights = await model.fetchAll();
    if (flights) {
      req.flights = flights;
      next();
    } else {
      const err = new Error("Flights not found");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const createFlight = async (req, res, next) => {
  try {
    const flight = req.body.flight;
    const flightCreated = await model.createFlight(flight);
    if (flightCreated) {
      req.flight = flightCreated;
      next();
    } else {
      const err = new Error("Cannot create flight");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const updateFlight = async (req, res, next) => {
  try {
    const flightId = req.body.flight._id;
    const flightUpdated = req.body.flight
    await model.updateFlight(flightId,req.body.flight);
    if (flightUpdated) {
      next();
    } else {
      const err = new Error("Cannot update flight");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const fetchAllPipeline = [
  //verify Admin,
  fetchAll,
];

const createPipeline = [
  //verify Admin,
  createFlight,
];

const updatePipeline = [
  //verify admin
  updateFlight,
]

module.exports = {
  fetchAllPipeline,
  createPipeline,
  updatePipeline
};
