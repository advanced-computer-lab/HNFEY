import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Axios from "axios";
import { Typography, Tooltip, Grid, Container } from "@material-ui/core";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import FlightIcon from "@mui/icons-material/Flight";
import getTimeDifference from "../../utils/time";

const ReservationDetails = (props) => {
  const [userReservations, setUserReservations] = useState({});
  const [user, setUser] = useState({});
  const [departingFlight, setDepartingFlight] = useState({});
  const [returnFlight, setReturnFlight] = useState({});
  const [cancelPressed, setCancelPressed] = useState("");
  let url3 = "http://localhost:8000/hnfey/flight/list-flights?";
  let url4 = "http://localhost:8000/hnfey/flight/list-flights?";
  const [mounted, setMounted] = useState(false);

  const reservationUrl =
    "http://localhost:8000/hnfey/reservation/" +
    props.location.state.userReservation._id;

  useEffect(() => {
    // setUserReservations(() => props.location.state.userReservation);
    Axios.get(reservationUrl).then((res) => {
      setUserReservations(() => res.data.reservation);
    });
    setUser(() => props.location.state.user);
    setMounted(() => true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const fetchData = async () => {
        {
          const flightIDQuery = "_id=" + userReservations.departingFlightId;
          url3 += flightIDQuery;

          const flightIDQuery1 = "_id=" + userReservations.returnFlightId;
          url4 += flightIDQuery1;
        }

        await Axios.get(url3).then((res) => {
          setDepartingFlight(() => res.data.flights[0]);
        });
        await Axios.get(url4).then((res) => {
          setReturnFlight(() => res.data.flights[0]);
        });
        if (userReservations.status === "Reserved") {
          setCancelPressed(false);
        } else {
          setCancelPressed(true);
        }
      };

      fetchData();
    }
  }, [userReservations, cancelPressed]);

  const cancel = (e, reservationId) => {
    confirmAlert({
      title: "Are you sure you want to cancel this reservation?",
      message: "Are you sure you want to cancel this reservation?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleCancel(e, reservationId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const handleCancel = async (e, reservationId) => {
    e.preventDefault();

    const reservation = {
      reservation: { _id: reservationId, status: "Cancelled" },
    };
    await Axios.put(
      "http://localhost:8000/hnfey/reservation/edit-reservation",
      reservation
    ).then((res) => {
      userReservations.status = "Cancelled";
      setCancelPressed(true);
    });
  };

  return userReservations?._id &&
    departingFlight._id &&
    returnFlight._id &&
    user._id ? (
    <div>
      <Container component="main" style={{ marginTop: "9%" }}>
        <Grid container alignItems="stretch" spacing={3}>
          <Grid item md={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "3%",
                marginLeft: "2%",
              }}
            >
              <h1>Reservation {userReservations._id}</h1>
            </div>
          </Grid>
          <Grid item md={6}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                align="right"
                style={{
                  width: 300,
                  marginTop: "4%",
                  fontSize: "1.1rem",
                }}
                variant="contained"
                color="primary"
                onClick={(e) => cancel(e, userReservations._id)}
                disabled={
                  cancelPressed || userReservations.status === "Cancelled"
                    ? true
                    : false
                }
              >
                {cancelPressed ? "Cancelled" : "Cancel"}
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="stretch"
          spacing={3}
          style={{ marginTop: "2%" }}
        >
          <Grid item md={6}>
            <div
              key={departingFlight._id}
              style={{
                display: "flex",
                borderRadius: "10px",
                backgroundColor: "#fff",
                flexDirection: "column",
                marginBottom: "4%",
              }}
            >
              <h1
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4% 4% 2%",
                }}
              >
                Departure Flight
              </h1>
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
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    marginBottom: "1%",
                  }}
                >
                  {departingFlight.from.split(" ")[0]} to{" "}
                  {departingFlight.to.split(" ")[0]}{" "}
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
                  HNFEY •{" "}
                  {moment(departingFlight.departureDay).format("ddd, MMM Do")}
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
                  {moment(departingFlight.departureDateTime).format("hh:mm A")}{" "}
                  - {moment(departingFlight.arrivalDateTime).format("hh:mm A")}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: "0.875rem", fontWeight: 300 }}
                >
                  {getTimeDifference(
                    departingFlight.departureDateTime,
                    departingFlight.arrivalDateTime
                  )}
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
                  Fare: {userReservations.class}
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
                    <LuggageIcon
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
                    {departingFlight.baggageAllowance} KG
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
                    {userReservations.class === "Business"
                      ? departingFlight.businessPrice
                      : departingFlight.economyPrice}
                    EGP
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={6}>
            <div
              key={returnFlight._id}
              style={{
                display: "flex",
                borderRadius: "10px",
                backgroundColor: "#fff",
                flexDirection: "column",
                marginBottom: "4%",
              }}
            >
              <h1
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4% 4% 2%",
                }}
              >
                Return Flight
              </h1>
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
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    marginBottom: "1%",
                  }}
                >
                  {returnFlight.from.split(" ")[0]} to{" "}
                  {returnFlight.to.split(" ")[0]}{" "}
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
                  HNFEY •{" "}
                  {moment(returnFlight.departureDay).format("ddd, MMM Do")}
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
                  {moment(returnFlight.departureDateTime).format("hh:mm A")} -{" "}
                  {moment(returnFlight.arrivalDateTime).format("hh:mm A")}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: "0.875rem", fontWeight: 300 }}
                >
                  {getTimeDifference(
                    returnFlight.departureDateTime,
                    returnFlight.arrivalDateTime
                  )}
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
                  Fare: {userReservations.class}
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
                    <LuggageIcon
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
                    {returnFlight.baggageAllowance} KG
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
                    {userReservations.class === "Business"
                      ? returnFlight.businessPrice
                      : returnFlight.economyPrice}
                    EGP
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container component="main" style={{ marginTop: "2%" }}>
        <Grid container alignItems="stretch" spacing={3}>
          <Grid item md={12}>
            <div
              key={userReservations._id}
              style={{
                display: "flex",
                borderRadius: "10px",
                backgroundColor: "#fff",
                flexDirection: "column",
                marginBottom: "4%",
              }}
            >
              {userReservations.passengers.map((passenger, index) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "4% 4% 2%",
                      }}
                    >
                      <Typography
                        variant="h2"
                        style={{
                          fontSize: "1.7rem",
                          fontWeight: 700,
                        }}
                      >
                        Passenger {index + 1}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "1% 4% 1%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          marginBottom: "1%",
                        }}
                      >
                        Passenger Name
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontSize: "1rem", fontWeight: 400 }}
                      >
                        {passenger.firstName} {passenger.lastName}
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "1% 4% 1%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          marginBottom: "1%",
                        }}
                      >
                        Passport Number
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontSize: "1rem", fontWeight: 400 }}
                      >
                        {passenger.passportNumber}
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "1% 4% 1%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          marginBottom: "1%",
                        }}
                      >
                        Departing Flight Seat
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontSize: "1rem", fontWeight: 400 }}
                      >
                        {passenger.departureSeat.seatNumber}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "1% 4% 1%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          marginBottom: "1%",
                        }}
                      >
                        Return Flight Seat
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontSize: "1rem", fontWeight: 400 }}
                      >
                        {passenger.returnSeat.seatNumber}
                      </Typography>
                    </div>
                  </>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default ReservationDetails;

{
  /* <TableContainer component={Paper} style={{ marginTop: "65px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Flight Number</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Departure Time</TableCell>
              <TableCell align="center">Return Time</TableCell>
              <TableCell align="center">Departure Terminal</TableCell>
              <TableCell align="center">Return Terminal</TableCell>
              <TableCell align="center">Number of Passengers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              <TableRow key={departingFlight._id}>
                <TableCell component="th" scope="row">
                  {departingFlight.flightNumber}
                </TableCell>
                <TableCell align="center">{departingFlight.from}</TableCell>
                <TableCell align="center">{departingFlight.to}</TableCell>
                <TableCell align="center">
                  {moment(departingFlight.departureDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {moment(departingFlight.arrivalDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {departingFlight.departureTerminal}
                </TableCell>
                <TableCell align="center">
                  {departingFlight.arrivalTerminal}
                </TableCell>
                <TableCell align="center">
                  {userReservations.numberOfPassengers}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>

              <TableRow key={returnFlight._id}>
                <TableCell component="th" scope="row">
                  {returnFlight.flightNumber}
                </TableCell>
                <TableCell align="center">{returnFlight.from}</TableCell>
                <TableCell align="center">{returnFlight.to}</TableCell>
                <TableCell align="center">
                  {moment(returnFlight.departureDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {moment(returnFlight.arrivalDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.departureTerminal}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.arrivalTerminal}
                </TableCell>
                <TableCell align="center">
                  {userReservations.numberOfPassengers}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          align="center"
          style={{
            width: 500,
            margin: "auto",
          }}
          variant="contained"
          color="primary"
          onClick={(e) => cancel(e, userReservations._id)}
          disabled={cancelPressed ? true : false}
        >
          {cancelPressed ? "Cancelled" : "Cancel"}
        </Button>
      </div> */
}
