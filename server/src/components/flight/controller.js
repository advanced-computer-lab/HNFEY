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


const findFlight = async (req, res, next) => {
  try {
    const flight = req.body.flight; //from frontend find flight form
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

const findPipeline = [
  //verify Admin,
  findFlight,
];

const deletePipeline = [
  //verify Admin,
  removeFlight,
];

module.exports = {
  fetchAllPipeline,
  createPipeline,
  findPipeline,
  deletePipeline

  
};
