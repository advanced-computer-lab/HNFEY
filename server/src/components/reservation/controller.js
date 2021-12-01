const model = require("./model");

const fetchAll = async (req, res, next) => {
  try {
    const reservations = await model.fetchAll();
    if (reservations) {
      req.reservations = reservations;
      next();
    } else {
      const err = new Error("Reservation not found");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
const findReservaton = async (req, res, next) => {
  try {
    const reservation = req.query;
    const resevationResults = await model.findReservation(reservation);
    if (resevationResults) {
      req.reservation = resevationResults;
      next();
    } else {
      const err = new Error("Cannot find your reservation");

      next(err);
    }
  } catch (err) {
    next(err);
  }
};
const createReservation = async (req, res, next) => {
  try {
    const reservation = req.body.reservation;
    const reservationCreated = await model.createReservation(reservation);
    if (reservationCreated) {
      req.reservation = reservationCreated;
      next();
    } else {
      const err = new Error("Cannot create Reservation");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const cancelReservation = async (req, res, next) => {
  try {
    await model.cancelReservation(req.params.id);
    next();
  } catch (err) {
    next(err);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const reservationId = req.body.reservation._id;
    const reservationUpdated = req.body.reservation;
    await model.updateReservation(reservationId, req.body.reservation);
    if (reservationUpdated) {
      req.updatedReservation = reservationUpdated;
      next();
    } else {
      const err = new Error("Cannot update reservation");
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
  createReservation,
];

const findPipeline = [
  //verify Admin,
  findReservaton,
];

const deletePipeline = [
  //verify Admin,
  cancelReservation,
];

const updatePipeline = [
  //verify admin
  updateReservation,
];

module.exports = {
  fetchAllPipeline,
  createPipeline,
  findPipeline,
  deletePipeline,
  updatePipeline,
};
