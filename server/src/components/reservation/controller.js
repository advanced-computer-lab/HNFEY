const model = require("./model");
const emailUtils = require("../../utils/email");

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
  const { departingFlight, returnFlight, user } = req;
  const { reservation } = req.body;
  const { passengers, totalPrice } = reservation;
  const { email } = req.body.reservation;
  const cabin = reservation.class;
  const text = `Dear ${user.firstName},\nYour reservation with us is confirmed!!\n\n\nDeparture Flight\n\t\t${departingFlight.from} to ${departingFlight.to}\nTotal Price: ${totalPrice}`;

  var mailOptions = {
    to: email,
    subject: "Reservation confirmation",
    text,
    html: `<div>
    <h1 style="font-size:1.2rem">Dear ${user.firstName},</h1>
    <p>Your reservation number <b>55 </b>with HnfeyAir is confirmed! Get started packing your bags!</p>
    <p style="font-size:1.3rem; font-weight: 600; margin-bottom: 1%;">Your reservation summary:</p>
    <div style="display:flex;">
        <div style="margin-left: 0.5%; width: 100%;">
            <h2 style="font-size:1.1rem; font-weight: 600;" >Departure Flight Details:</h2>
            <p style="margin-left: 5%;">From <b>${
              departingFlight.from
            }</b> To <b>${departingFlight.to}</b></p>
            <p style="margin:0%; margin-bottom: 1%; margin-left: 10%;"><b>Departure Day:</b> &nbsp; ${departingFlight.departureDay.toLocaleDateString()}</p>
            <p style="margin:0%; margin-bottom: 2%; margin-left: 10%;">${departingFlight.departureDateTime.toLocaleTimeString()} - ${departingFlight.arrivalDateTime.toLocaleTimeString()}</p>
            <p style="margin:0%; margin-bottom: 2%; margin-left: 10%;"><b>Bags Allowance:</b> ${
              departingFlight.baggageAllowance
            } KG</p>
            <p style="margin:0%; margin-left: 10%; margin-bottom: 2%;"><b>Price:</b> ${
              reservation.class === "Business"
                ? departingFlight.businessPrice
                : departingFlight.economyPrice
            } EGP</p>
            <p style="margin:0%; margin-left: 10%; margin-bottom: 2%;"><b>Class:</b> ${
              reservation.class
            }</p>
        </div>
        
    </div>
    <div style="display:flex;">
        
        <div style="margin-left: 0.5%; width: 100%;">
            <h2 style="font-size:1.1rem; font-weight: 600;" >Return Flight Details:</h2>
            <p style="margin-left: 5%;">From <b>${
              returnFlight.from
            }</b> To <b>${returnFlight.to}</b></p>
            <p style="margin:0%; margin-bottom: 1%; margin-left: 10%;"><b>Return Day:</b> &nbsp;${returnFlight.departureDay.toLocaleDateString()}</p>
            <p style="margin:0%; margin-bottom: 2%; margin-left: 10%;">${returnFlight.departureDateTime.toLocaleTimeString()} - ${returnFlight.arrivalDateTime.toLocaleTimeString()}</p>
            <p style="margin:0%; margin-bottom: 2%; margin-left: 10%;"><b>Bags Allowance:</b> ${
              returnFlight.baggageAllowance
            } KG</p>
            <p style="margin:0%; margin-left: 10%; margin-bottom: 2%;"><b>Price:</b> ${
              reservation.class === "Business"
                ? returnFlight.businessPrice
                : returnFlight.economyPrice
            } EGP</p>
            <p style="margin:0%; margin-left: 10%; margin-bottom: 2%;"> <b>Class: </b>${
              reservation.class
            }</p>
        </div>
    </div>
    <hr style="width: 100%; margin-top: 1.5%;">
    <div style="display:flex; margin-top: 1%;">
        <div style="margin-left: 0.5%; width: 100%;">
            <h2 style="font-size:1.1rem; font-weight: 600;" >Price Summary:</h2>
            <p style="margin-left: 5%;"><b>x${
              reservation.passengers.length
            } Passengers</b></p>
            <p style="margin-left: 5%;">Total Departure Flight      &nbsp; &nbsp; <b>EGP ${
              reservation.passengers.length *
              (reservation.class === "Business"
                ? departingFlight.businessPrice
                : departingFlight.economyPrice)
            }</b></p>
            <p style="margin-left: 5%;">Total Return Flight&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; <b>EGP ${
              reservation.passengers.length *
              (reservation.class === "Business"
                ? returnFlight.businessPrice
                : returnFlight.economyPrice)
            }</b></p>
            <p style="margin-left: 5%;"><b>Total Price&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;EGP ${totalPrice}</b></p>
        </div>
    </div>

</div>`,
  };
  req.mailOptions = mailOptions;
  emailUtils.sendMail(req, res, next);
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
  getUser,
  getFlights,
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
