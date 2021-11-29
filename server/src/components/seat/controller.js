const model = require("./model");

const fetchAll = async (req, res, next) => {
  try {
    const seats = await model.fetchAll();
    if (seats) {
      req.seats = seats;
      next();
    } else {
      const err = new Error("Seats not found");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const fetchUserSeats = async (req, res, next) => {
  try {
    const seat = req.query;
    const seatResults = await model.findUserSeats(seat);
    if (seatResults) {
      req.seats = seatResults;
      next();
    } else {
      const err = new Error("Cannot find seat");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const createSeat = async (req, res, next) => {
  try {
    const seat = req.body.seat;
    const seatCreated = await model.createSeat(seat);
    if (seatCreated) {
      req.seat = seatCreated;
      next();
    } else {
      const err = new Error("Cannot create seat");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const createSeatsBulk = async (req, res, next) => {
  try {
    const seats = req.body.seats;
    const seatsCreated = await model.createSeatsBulk(seats);
    if (seatsCreated) {
      req.seats = seatsCreated;
      next();
    } else {
      const err = new Error("Cannot create seat");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const updateSeat = async (req, res, next) => {
  try {
    const seatId = req.body.seat._id;
    const seatUpdated = req.body.seat;
    await model.updateSeat(seatId, req.body.seat);
    if (seatUpdated) {
      next();
    } else {
      const err = new Error("Cannot update seat");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const fetch = async (req, res, next) => {
  try {
    const id = req.params.id;
    let seat;
    if (req.query) {
      const seatSearch = {
        id,
        class: req.query.class,
        passengers: req.query.passengers,
      };
      seat = await model.findSeatById(seatSearch);
    } else seat = await model.findSeatById(id);
    if (seat) {
      req.seat = seat;
      next();
    } else {
      const err = new Error("Cannot find seat");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const findSeat = async (req, res, next) => {
  try {
    const seat = req.query;
    const seatResults = await model.findSeat(seat);
    if (seatResults) {
      req.seats = seatResults;
      next();
    } else {
      const err = new Error("Cannot find seat");

      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const removeSeat = async (req, res, next) => {
  try {
    await model.removeSeat(req.params.id);
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
  createSeat,
];

const createBulkPipeline = [
  //verify Admin,
  createSeatsBulk,
];

const updatePipeline = [
  //verify admin
  updateSeat,
];
const findPipeline = [
  //verify Admin,
  findSeat,
];

const findUserSeatsPipeline = [
  //verify Admin,
  fetchUserSeats,
];

const fetchPipeline = [fetch];

const deletePipeline = [
  //verify Admin,
  removeSeat,
];

module.exports = {
  fetchAllPipeline,
  fetchPipeline,
  createPipeline,
  updatePipeline,
  findUserSeatsPipeline,
  findPipeline,
  deletePipeline,
  createBulkPipeline,
};
