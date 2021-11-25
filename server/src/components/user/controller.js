const model = require("./model");

const fetchAll = async (req, res, next) => {
  try {
    const users = await model.fetchAll();
    if (users) {
      req.users = users;
      next();
    } else {
      const err = new Error("Users not found");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = req.body.user;
    const userCreated = await model.createUser(user);
    if (userCreated) {
      req.user = userCreated;
      next();
    } else {
      const err = new Error("Cannot create user");
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


const fetchAllPipeline = [
  //verify Admin,
  fetchAll,
];

const createPipeline = [
  //verify Admin,
  createUser,
];

const findFlightsPipeline = [
  //verify Admin,
  findFlight,
];

module.exports = {
  fetchAllPipeline,
  createPipeline,
  findFlightsPipeline,
};
