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

const fetchUserFlights = async (req, res, next) => {
  try {
    const flight = req.query;
    const flightResults = await model.findUserFlights(flight);
    if (flightResults) {
      req.flights = flightResults;
      next();
    } else {
      const err = new Error("Cannot find flight");

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
    const flightUpdated = req.body.flight;
    await model.updateFlight(flightId, req.body.flight);
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

const fetch = async (req, res, next) => {
  try {
    const id = req.params.id;
    let flight;
    if (req.query) {
      const flightSearch = {
        id,
        class: req.query.class,
        passengers: req.query.passengers,
      };
      flight = await model.findFlightById(flightSearch);
    } else flight = await model.findFlightById(id);
    if (flight) {
      req.flight = flight;
      next();
    } else {
      const err = new Error("Cannot find flight");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const findFlight = async (req, res, next) => {
  try {
    const flight = req.query;
    const flightResults = await model.findFlight(flight);
    if (flightResults) {
      req.flights = flightResults;
      next();
    } else {
      const err = new Error("Cannot find flight");

      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const removeFlight = async (req, res, next) => {
  try {
    await model.removeFlight(req.params.id);
    next();
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
];
const findPipeline = [
  //verify Admin,
  findFlight,
];

const findUserFlightsPipeline = [
  //verify Admin,
  fetchUserFlights,
];

const fetchPipeline = [fetch];

const deletePipeline = [
  //verify Admin,
  removeFlight,
];

module.exports = {
  fetchAllPipeline,
  fetchPipeline,
  createPipeline,
  updatePipeline,
  findUserFlightsPipeline,
  findPipeline,
  deletePipeline,
};
