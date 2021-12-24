const model = require("./model");
const email = require("../../utils/email");

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

const fetch = async (req, res, next) => {
  try {
    const reservation = req.params.id;
    const reservationResult = await model.fetch(reservation);
    if (reservationResult) {
      req.reservation = reservationResult;
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

const getUser = async (req, res, next) => {
  try {
    const _id = req.body.reservation.userId;
    const user = await model.fetchUserById(_id);
    if (user) {
      req.user = user;
      next();
    } else {
      const error = new Error("Cannot get user");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const getFlights = async (req, res, next) => {
  try {
    const { departingFlightId, returnFlightId } = req.body.reservation;
    const departingFlight = await model.fetchFlightById(departingFlightId);
    const returnFlight = await model.fetchFlightById(returnFlightId);
    if (departingFlight && returnFlight) {
      req.departingFlight = departingFlight;
      req.returnFlight = returnFlight;
      next();
    } else {
      const error = new Error("Cannot fetch flights");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const sendConfirmationMail = (req, res, next) => {
  const { departingFlight, returnFlight, reservation } = req;
  const { passengers, totalPrice, email } = reservation;
  const user = req.user;
  const cabin = reservation.class;
  const text = `Dear ${user.firstName},\nYour reservation with us is confirmed!!\n\n\nDeparture Flight\n\t\t${departingFlight.from} to ${departingFlight.to}\nTotal Price: ${totalPrice}`;

  var mailOptions = {
    to: email,
    subject: "Reservation confirmation",
    text,
    html: `<div>
            <h1>Dear ${user.firstName}</h1>
            <p>Your reservation with HnfeyAir is confirmed!! Get started packing your bags!!</p>
            <div style="display:flex">
              <div style="flex-grow:1">
               <h2>Departure Flight Details:</h2>
               <p>From <b>${departingFlight.from}</b> To <b>${departingFlight.to}</b></p>
              </div>
              <div style="flex-grow:1">
               <h2>Return Flight Details:</h2>
               <p>From <b>${returnFlight.from}</b> To <b>${returnFlight.to}</b></p>
              </div>
            </div>
            
          </div>`,
  };
  req.mailOptions = mailOptions;
  email.sendMail(req, res, next);
  next();
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
    const reservationUpdated = await model.updateReservation(
      reservationId,
      req.body.reservation
    );
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

const fetchPipeline = [
  //verify Admin,
  fetch,
];

const createPipeline = [
  //verify Admin,
  createReservation,
  getUser,
  getFlights,
  sendConfirmationMail,
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
const sendConfirmationMailPipeline = [
  //verify user,
  sendConfirmationMail,
];

module.exports = {
  fetchAllPipeline,
  fetchPipeline,
  createPipeline,
  findPipeline,
  deletePipeline,
  updatePipeline,
  sendConfirmationMailPipeline,
};
