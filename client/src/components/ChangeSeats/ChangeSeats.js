import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PowerIcon from "@mui/icons-material/Power";
import WifiIcon from "@mui/icons-material/Wifi";
import AccessibleIcon from "@mui/icons-material/Accessible";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import FlightIcon from "@mui/icons-material/Flight";
import { ReactComponent as Seat } from "./images/seat.svg";
import moment from "moment";
import getTimeDifference from "../../utils/time";
import { useHistory } from "react-router";
import { editFlight } from "../../api/flight";
import StripeCheckout from "react-stripe-checkout";
import { editReservation } from "../../api/reservation";
import { pay, refund } from "../../api/payment";

const ChangeSeats = (props) => {
  const flight = props.location.state.flight;
  const flightType = props.location.state.flightType;
  const reservation = props.location.state.userReservation;
  const passengerNumber = props.location.state.passengerNo;
  const priceDifference = props.location.state.priceDifference;
  const [currentPassenger, setCurrentPassenger] = useState("");
  const [seatsSelected, setSeatsSelected] = useState("");
  const [noOfSeatsSelected, setNoOfSeatsSelected] = useState(0);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [economySeats, setEconomySeats] = useState([]);
  const history = useHistory();
  let chargeId;

  console.log(props.location.state);

  if (businessSeats.length !== 0 && economySeats.length !== 0) {
    if (reservation.class === "Business") {
      businessSeats.forEach((flightSeat) => {
        if (flightSeat.seatNumber === seatsSelected)
          flightSeat.reserved = false;
      });
    } else {
      economySeats.forEach((flightSeat) => {
        if (flightSeat.seatNumber === seatsSelected)
          flightSeat.reserved = false;
      });
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      if (passengerNumber < reservation.passengers.length)
        setCurrentPassenger(
          props.location.state.userReservation.passengers.find(
            (_, i) => passengerNumber === i
          )
        );

      flight?.seats.map((seat) =>
        seat.class === "Business"
          ? setBusinessSeats((prev) => [...prev, seat])
          : setEconomySeats((prev) => [...prev, seat])
      );
    };
    fetchData();

    if (props.location.state.newFlight === undefined) {
      flightType === "Departure flight"
        ? setSeatsSelected(
            () =>
              props.location.state.userReservation.passengers.find(
                (_, i) => passengerNumber === i
              ).departureSeat.seatNumber
          )
        : setSeatsSelected(
            () =>
              props.location.state.userReservation.passengers.find(
                (_, i) => passengerNumber === i
              ).returnSeat.seatNumber
          );
      setNoOfSeatsSelected(() => 1);
    }
  }, [flight, flightType]);

  const onSeatClick = (seat) => {
    if (seatsSelected === seat.seatNumber) {
      setSeatsSelected("");
      setNoOfSeatsSelected(0);
      return;
    }
    if (seat.class === reservation.class) {
      if (noOfSeatsSelected === 0) {
        setSeatsSelected(seat.seatNumber);
        setNoOfSeatsSelected((prev) => prev + 1);
      } else {
        setSeatsSelected("");
        setNoOfSeatsSelected(0);
        setSeatsSelected(seat.seatNumber);
        setNoOfSeatsSelected((prev) => prev + 1);
      }
    }
  };

  const handleSubmit = () => {
    if (noOfSeatsSelected === 0) {
      alert("Select your seats");
      return;
    }
    if (reservation.class === "Business") {
      businessSeats.forEach((flightSeat) => {
        if (flightSeat.seatNumber === seatsSelected) flightSeat.reserved = true;
      });
    } else {
      economySeats.forEach((flightSeat) => {
        if (flightSeat.seatNumber === seatsSelected) flightSeat.reserved = true;
      });
    }
    flightType === "Departure flight"
      ? (currentPassenger.departureSeat.seatNumber = seatsSelected)
      : (currentPassenger.returnSeat.seatNumber = seatsSelected);
    reservation.passengers.forEach((passenger) => {
      passenger =
        passenger._id === currentPassenger._id ? currentPassenger : passenger;
    });

    const flightBody =
      reservation.class === "Business"
        ? {
            flight: {
              _id: flight._id,
              seats: businessSeats.concat(economySeats),
              numberOfAvailableBusinessSeats:
                flight.numberOfAvailableBusinessSeats - 1,
            },
          }
        : {
            flight: {
              _id: flight._id,
              seats: businessSeats.concat(economySeats),
              numberOfAvailableEconomySeats:
                flight.numberOfAvailableEconomySeats - 1,
            },
          };

    const reservationBody = {
      reservation: {
        _id: reservation._id,
        passengers: reservation.passengers,
      },
    };

    delete props.location.state.passengerNo;

    editFlight(flightBody);
    if (passengerNumber === reservation.passengers.length - 1) {
      delete props.location.state.flightType;
      delete props.location.state.flight;
      if (priceDifference < 0) {
        refund({
          chargeId: reservation.chargeId,
          amount: Math.abs(priceDifference),
        });
      }
      editReservation(reservationBody).then((res) => {
        history.push("/reservation", {
          ...props.location.state,
          userReservation: reservation,
        });
      });
    } else {
      const state = {
        ...props.location.state,
        passengerNo: passengerNumber + 1,
        userReservation: reservation,
      };
      history.push("/change-seats", state);
      history.go(0);
    }
  };

  const makePayment = async (token) => {
    const email = JSON.parse(localStorage.getItem("profile")).user.email;
    const body = {
      token,
      product: {
        price: priceDifference,
      },
      email,
    };

    return pay(body)
      .then((res) => {
        console.log(res.data.charge);
        chargeId = res.data.charge.id;
        handleSubmit();
      })
      .catch((err) => console.log(err));
  };

  return flight ? (
    <Container component="main" style={{ marginTop: "6%" }}>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item xs={6}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Typography
              variant="body1"
              display="inline"
              style={{
                display: "flex",
              }}
            >
              HNFEY • {flight.from}
              <ArrowForwardIcon
                fontSize="small"
                style={{ fontSize: "1.5rem" }}
              />{" "}
              {flight.to}
              {"  "}
              <ArrowForwardIosIcon
                fontSize="small"
                style={{ fontSize: "1.5rem" }}
              />
            </Typography>
            <Typography
              style={{
                fontWeight: 700,
                fontSize: "1.4rem",
                marginInline: "1%",
              }}
            >
              Choose Seats
            </Typography>
          </div>
          <div
            style={{ display: "flex", textIndent: "10px", marginBottom: "3%" }}
          >
            <Typography
              variant="h4"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.4rem",
                fontWeight: 500,
              }}
            >
              {props.location.state.flightType} summary
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: "10px",
              backgroundColor: "#fff",
              flexDirection: "column",
              marginBottom: "4%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "4% 4% 0%",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  marginBottom: "1%",
                }}
              >
                {flight.from.split(" ")[0]} to {flight.to.split(" ")[0]}{" "}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0% 4% 3%",
              }}
            >
              <FlightIcon
                fontSize="small"
                style={{ color: "#00000070", transform: "rotate(40deg)" }}
              />
              <Typography
                display="inline"
                variant="body1"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 300,
                }}
              >
                HNFEY • {moment(flight.departureDay).format("ddd, MMM Do")}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0% 4% 6%",
              }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                {moment(flight.departureDateTime).format("hh:mm A")} -{" "}
                {moment(flight.arrivalDateTime).format("hh:mm A")}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "0.875rem", fontWeight: 300 }}
              >
                {getTimeDifference(
                  flight.departureDateTime,
                  flight.arrivalDateTime
                )}
              </Typography>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Tooltip title="Power">
                  <PowerIcon fontSize="small" style={{ marginRight: "0.2%" }} />
                </Tooltip>
                <Tooltip title="Wifi">
                  <WifiIcon fontSize="small" style={{ marginInline: "0.2%" }} />
                </Tooltip>
                <Tooltip title="Accessible">
                  <AccessibleIcon
                    fontSize="small"
                    style={{ marginInline: "0.2%" }}
                  />
                </Tooltip>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0% 4% 6%",
              }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Fare: {flight.class}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "0.875rem", fontWeight: 400 }}
              >
                Your selection applies to all flights
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0% 4% 8%",
              }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Bags
              </Typography>

              <Typography
                variant="body1"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textIndent: "20px",
                }}
              >
                • Carry-on bag included
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textIndent: "20px",
                }}
              >
                • 2 checked bags included
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "2%",
                }}
              >
                <Tooltip title="Baggage weight">
                  <LuggageIcon fontSize="small" style={{ marginRight: "1%" }} />
                </Tooltip>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                  }}
                >
                  {flight.baggageAllowance} KG
                </Typography>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0% 4% 6%",
              }}
            >
              <Typography
                display="inline"
                ariant="body1"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Price:
              </Typography>
              <div style={{ display: "flex", marginLeft: "2%" }}>
                <Tooltip title="Price">
                  <PaidRoundedIcon
                    fontSize="small"
                    style={{ marginRight: "1%" }}
                  />
                </Tooltip>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                  }}
                >
                  {flight.class === "Economy"
                    ? flight.economyPrice
                    : flight.businessPrice}{" "}
                  EGP
                </Typography>
              </div>
            </div>
          </div>
          {priceDifference > 0 &&
          passengerNumber === reservation.passengers.length - 1 ? (
            <StripeCheckout
              currency="EGP"
              stripeKey="pk_test_51K9Vp6DHyFDpcdiHt9NGEIZRJJMdtwrcGx1QuPZe5N0UhB9Kf3y1Y3oQfZWEXIwsv9mHLeHVqToil9P9giCviy9I00VR1fbDZ9"
              token={makePayment}
              name="Reserve Flight"
              amount={priceDifference * 100}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ width: "40%" }}
              >
                {passengerNumber === reservation.passengers.length - 1
                  ? priceDifference > 0
                    ? `Pay ${priceDifference} EGP`
                    : `Get ${Math.abs(priceDifference)} EGP Refund`
                  : "Save and Proceed"}
              </Button>
            </StripeCheckout>
          ) : priceDifference < 0 &&
            passengerNumber === reservation.passengers.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ width: "40%" }}
            >
              {passengerNumber === reservation.passengers.length - 1
                ? priceDifference > 0
                  ? `Pay ${priceDifference} EGP`
                  : `Get ${Math.abs(priceDifference)} EGP Refund`
                : "Save and Proceed"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ width: "40%" }}
            >
              {passengerNumber === reservation.passengers.length - 1
                ? priceDifference > 0
                  ? `Pay ${priceDifference} EGP`
                  : `Get ${Math.abs(priceDifference)} EGP Refund`
                : "Save and Proceed"}
            </Button>
          )}
          <br />
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              display: "flex",
              borderRadius: "10px",
              backgroundColor: "#fff",
              flexDirection: "column",
              marginBottom: "4%",
              marginTop: "18.2%",
            }}
          >
            <div style={{ margin: "4% 2% 2%", display: "flex" }}>
              <Typography
                variant="h3"
                style={{ fontSize: "1.5rem", fontWeight: 500 }}
              >
                Choose seat for passenger {props.location.state.passengerNo + 1}
              </Typography>
            </div>

            <div style={{ margin: "1% 2% 2%", display: "flex" }}>
              <Typography
                variant="h6"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  marginLeft: "10%",
                }}
              >
                {currentPassenger.firstName + " " + currentPassenger.lastName}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  marginLeft: "25%",
                }}
              >
                {currentPassenger.passportNumber}
              </Typography>
            </div>

            <div
              style={{
                margin: "3% 2%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                style={{ fontSize: "1.4rem", fontWeight: 500 }}
              >
                Business Class
              </Typography>
            </div>
            <div style={{ display: "flex", margin: "2%" }}>
              <Grid container alignItems="stretch">
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      A
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      B
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      C
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      D
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      E
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      F
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>

                {businessSeats.map((businessSeat, i) => {
                  if (i % 6 === 0) {
                    return (
                      <React.Fragment key={i}>
                        <Grid item xs={1}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "25px",
                              height: "25px",
                            }}
                          >
                            <Typography
                              variant="h3"
                              style={{ fontSize: "1rem", fontWeight: 500 }}
                            >
                              {Math.floor(i / 6) + 1}
                            </Typography>
                          </div>
                        </Grid>

                        <Grid item xs={1}>
                          <div
                            style={{
                              cursor:
                                reservation.class !== "Business" ||
                                (businessSeat.reserved &&
                                  seatsSelected !== businessSeat.seatNumber)
                                  ? "not-allowed"
                                  : "allowed",
                            }}
                            onClick={() => onSeatClick(businessSeat)}
                          >
                            <Tooltip title={businessSeat.seatNumber}>
                              <Seat
                                fill={
                                  reservation.class !== "Business"
                                    ? "#666"
                                    : seatsSelected === businessSeat.seatNumber
                                    ? "green"
                                    : businessSeat.reserved
                                    ? "red"
                                    : ""
                                }
                                style={{ width: "25px", height: "25px" }}
                                onClick={() => {}}
                              />
                            </Tooltip>
                          </div>
                        </Grid>
                      </React.Fragment>
                    );
                  } else if (i % 6 === 5) {
                    return (
                      <React.Fragment key={i}>
                        <Grid item xs={1}>
                          <div
                            style={{
                              cursor:
                                reservation.class !== "Business" ||
                                (businessSeat.reserved &&
                                  seatsSelected !== businessSeat.seatNumber)
                                  ? "not-allowed"
                                  : "allowed",
                            }}
                            onClick={() => onSeatClick(businessSeat)}
                          >
                            <Tooltip title={businessSeat.seatNumber}>
                              <Seat
                                fill={
                                  reservation.class !== "Business"
                                    ? "#666"
                                    : seatsSelected === businessSeat.seatNumber
                                    ? "green"
                                    : businessSeat.reserved
                                    ? "red"
                                    : ""
                                }
                                style={{ width: "25px", height: "25px" }}
                              />
                            </Tooltip>
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                          <div
                            fill={
                              reservation.class !== "Business"
                                ? "#666"
                                : seatsSelected === businessSeat.seatNumber
                                ? "green"
                                : businessSeat.reserved
                                ? "red"
                                : ""
                            }
                            style={{ width: "25px", height: "25px" }}
                          ></div>
                        </Grid>
                      </React.Fragment>
                    );
                  } else if (i % 2 === 1) {
                    return (
                      <React.Fragment key={i}>
                        <Grid item xs={1}>
                          <div
                            style={{
                              cursor:
                                reservation.class !== "Business" ||
                                (businessSeat.reserved &&
                                  seatsSelected !== businessSeat.seatNumber)
                                  ? "not-allowed"
                                  : "allowed",
                            }}
                            onClick={() => onSeatClick(businessSeat)}
                          >
                            <Tooltip title={businessSeat.seatNumber}>
                              <Seat
                                fill={
                                  reservation.class !== "Business"
                                    ? "#666"
                                    : seatsSelected === businessSeat.seatNumber
                                    ? "green"
                                    : businessSeat.reserved
                                    ? "red"
                                    : ""
                                }
                                style={{ width: "25px", height: "25px" }}
                              />
                            </Tooltip>
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div style={{ width: "80px", height: "25px" }}></div>
                        </Grid>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment key={i}>
                        <Grid item xs={1}>
                          <div
                            style={{
                              cursor:
                                reservation.class !== "Business" ||
                                (businessSeat.reserved &&
                                  seatsSelected !== businessSeat.seatNumber)
                                  ? "not-allowed"
                                  : "allowed",
                            }}
                            onClick={() => onSeatClick(businessSeat)}
                          >
                            <Tooltip title={businessSeat.seatNumber}>
                              <Seat
                                fill={
                                  reservation.class !== "Business"
                                    ? "#666"
                                    : seatsSelected === businessSeat.seatNumber
                                    ? "green"
                                    : businessSeat.reserved
                                    ? "red"
                                    : ""
                                }
                                style={{ width: "25px", height: "25px" }}
                              />
                            </Tooltip>
                          </div>
                        </Grid>
                      </React.Fragment>
                    );
                  }
                })}
              </Grid>
            </div>
            <div
              style={{
                margin: "3% 2%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                style={{ fontSize: "1.4rem", fontWeight: 500 }}
              >
                Economy Class
              </Typography>
            </div>
            <div style={{ display: "flex", margin: "2% 2% 10%" }}>
              <Grid container alignItems="stretch">
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      A
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      B
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      C
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>

                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      D
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      E
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      F
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      G
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      H
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      I
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      J
                    </Typography>
                  </div>
                </Grid>
                {economySeats.map((economySeat, i) => {
                  if (i % 10 === 2) {
                    return (
                      <React.Fragment key={i}>
                        <Grid item xs={1}>
                          <div
                            style={{
                              cursor:
                                reservation.class !== "Economy" ||
                                (economySeat.reserved &&
                                  seatsSelected !== economySeat.seatNumber)
                                  ? "not-allowed"
                                  : "allowed",
                            }}
                            onClick={() => onSeatClick(economySeat)}
                          >
                            <Tooltip title={economySeat.seatNumber}>
                              <Seat
                                fill={
                                  reservation.class !== "Economy"
                                    ? "#666"
                                    : seatsSelected === economySeat.seatNumber
                                    ? "green"
                                    : economySeat.reserved
                                    ? "red"
                                    : ""
                                }
                                style={{ width: "25px", height: "25px" }}
                              />
                            </Tooltip>
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "25px",
                              height: "25px",
                            }}
                          >
                            <Typography
                              variant="h3"
                              style={{ fontSize: "1rem", fontWeight: 500 }}
                            >
                              {Math.floor(i / 10) +
                                Math.ceil(flight.numberOfBusinessSeats / 6) +
                                1}
                            </Typography>
                          </div>
                        </Grid>
                      </React.Fragment>
                    );
                  } else if (i % 10 === 6) {
                    return (
                      <React.Fragment key={i}>
                        <Grid item xs={1}>
                          <div
                            style={{
                              cursor:
                                reservation.class !== "Economy" ||
                                (economySeat.reserved &&
                                  seatsSelected !== economySeat.seatNumber)
                                  ? "not-allowed"
                                  : "allowed",
                            }}
                            onClick={() => onSeatClick(economySeat)}
                          >
                            <Tooltip title={economySeat.seatNumber}>
                              <Seat
                                fill={
                                  reservation.class !== "Economy"
                                    ? "#666"
                                    : seatsSelected === economySeat.seatNumber
                                    ? "green"
                                    : economySeat.reserved
                                    ? "red"
                                    : ""
                                }
                                style={{ width: "25px", height: "25px" }}
                              />
                            </Tooltip>
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                          <div style={{ width: "25px", height: "25px" }}></div>
                        </Grid>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment key={i}>
                        <Grid item xs={1}>
                          <div
                            style={{
                              cursor:
                                reservation.class !== "Economy" ||
                                (economySeat.reserved &&
                                  seatsSelected !== economySeat.seatNumber)
                                  ? "not-allowed"
                                  : "allowed",
                            }}
                            onClick={() => onSeatClick(economySeat)}
                          >
                            <Tooltip title={economySeat.seatNumber}>
                              <Seat
                                fill={
                                  reservation.class !== "Economy"
                                    ? "#666"
                                    : seatsSelected === economySeat.seatNumber
                                    ? "green"
                                    : economySeat.reserved
                                    ? "red"
                                    : ""
                                }
                                style={{ width: "25px", height: "25px" }}
                              />
                            </Tooltip>
                          </div>
                        </Grid>
                      </React.Fragment>
                    );
                  }
                })}
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Container component="main">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    </Container>
  );
};

export default ChangeSeats;
