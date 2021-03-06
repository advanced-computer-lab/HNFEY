import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Typography, Tooltip, Grid, Container } from "@material-ui/core";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import FlightIcon from "@mui/icons-material/Flight";
import getTimeDifference from "../../utils/time";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useHistory } from "react-router";
import {
  editReservation,
  findReservation,
  confirmReservation,
} from "../../api/reservation";
import { cancelFlight, findFlight } from "../../api/flight";
import { refund } from "../../api/payment";

const ReservationDetails = (props) => {
  const [userReservation, setUserReservation] = useState(
    props.location.state.userReservation
  );
  const history = useHistory();
  const [user] = useState(JSON.parse(localStorage.getItem("profile")).user);
  const [departingFlight, setDepartingFlight] = useState({});
  const [returnFlight, setReturnFlight] = useState({});
  const [cancelPressed, setCancelPressed] = useState("");

  const reservationId = props.location.state.userReservation._id;

  useEffect(() => {
    findReservation(reservationId).then((res) => {
      setUserReservation(() => res.data.reservation);
    });
  }, [props.location.state.user]);

  useEffect(() => {
    let url3 = "http://localhost:8000/hnfey/flight/";
    let url4 = "http://localhost:8000/hnfey/flight/";
    const fetchData = async () => {
      if (userReservation.departingFlightId) {
        url3 += userReservation.departingFlightId;
        url4 += userReservation.returnFlightId;

        await findFlight(url3).then((res) => {
          setDepartingFlight(() => res.data.flight);
        });
        await findFlight(url4).then((res) => {
          setReturnFlight(() => res.data.flight);
        });
        if (userReservation.status === "Reserved") {
          setCancelPressed(false);
        } else {
          setCancelPressed(true);
        }
      }
    };

    fetchData();
  }, [userReservation, cancelPressed]);

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

    refund({ chargeId: userReservation.chargeId });

    await editReservation(reservation).then(() => {
      userReservation.status = "Cancelled";
      setCancelPressed(true);
    });

    cancelFlight({
      user: {
        email: user.email,
      },
      totalPrice: userReservation.totalPrice,
    });
  };

  const handleMail = async (e) => {
    e.preventDefault();
    const email = JSON.parse(localStorage.getItem("profile")).user.email;
    const userId = JSON.parse(localStorage.getItem("profile")).user._id;
    const reservation = {
      reservation: {
        userId,
        departingFlightId: departingFlight._id,
        returnFlightId: returnFlight._id,
        passengers: userReservation.passengers,
        class: userReservation.class,
        status: "Reserved",
        totalPrice: userReservation.totalPrice,
        email,
      },
    };
    confirmReservation(reservation).then((res) => {
      confirmAlert({
        title: "Email Sent",
        message: "Email Sent Successfully",
        buttons: [
          {
            label: "Ok",
            onClick: () => {},
          },
        ],
      });
    });
    // cancelFlight({
    //   user: {
    //     email: user.email,
    //   },
    //   totalPrice: userReservation.totalPrice,
    // });
  };

  const handleEditFlight = async (e, flightId) => {
    e.preventDefault();
    if (flightId === departingFlight._id) {
      history.push("/edit-reserved-flight", {
        ...props.location.state,
        flight: departingFlight,
        flightType: "Departure flight",
        returnFlightDate: returnFlight.departureDay,
      });
    } else {
      history.push("/edit-reserved-flight", {
        ...props.location.state,
        flight: returnFlight,
        flightType: "Return flight",
        departureFlightDate: departingFlight.departureDay,
      });
    }
  };

  const handleEditSeat = (e, flightId) => {
    e.preventDefault();
    if (flightId === departingFlight._id) {
      history.push("/change-seats", {
        ...props.location.state,
        flight: departingFlight,
        flightType: "Departure flight",
        passengerNo: 0,
      });
    } else {
      history.push("/change-seats", {
        ...props.location.state,
        flight: returnFlight,
        flightType: "Return flight",
        passengerNo: 0,
      });
    }
  };

  return departingFlight?._id &&
    returnFlight?._id &&
    userReservation?._id &&
    user?._id ? (
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
                marginTop: "6%",
              }}
            >
              <Typography
                variant="h5"
                style={{ fontSize: "2rem", fontWeight: 500 }}
              >
                Reservation {userReservation.index}
              </Typography>
            </div>
          </Grid>
          <Grid item md={6}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                align="right"
                style={{
                  width: 250,
                  marginTop: "4%",
                  fontSize: "1rem",
                  marginRight: "2%",
                }}
                variant="contained"
                color="primary"
                onClick={(e) => handleMail(e)}
                disabled={
                  cancelPressed || userReservation.status === "Cancelled"
                    ? true
                    : false
                }
              >
                Email itinerary
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                align="right"
                style={{
                  width: 250,
                  marginTop: "2%",
                  fontSize: "1rem",
                  marginRight: "2%",
                }}
                variant="contained"
                color="primary"
                onClick={(e) => cancel(e, userReservation._id)}
                disabled={
                  cancelPressed || userReservation.status === "Cancelled"
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
              <Typography
                vaiant="h6"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4% 4% 2%",
                  fontSize: "1.7rem",
                  fontWeight: 500,
                }}
              >
                Departure Flight
              </Typography>
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
                  HNFEY ???{" "}
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
                  Fare: {userReservation.class}
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
                  ??? Carry-on bag included
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    textIndent: "20px",
                  }}
                >
                  ??? 2 checked bags included
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
                  gap: "0.4rem",
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
                  Seats:
                </Typography>
                {userReservation.passengers.map((passenger, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div style={{ display: "flex", marginLeft: "2%" }}>
                        <Typography
                          variant="body1"
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 400,
                          }}
                        >
                          {passenger.departureSeat.seatNumber}
                        </Typography>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0% 4% 6%",
                  gap: "0.4rem",
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
                  Ticket Price:
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
                    EGP{" "}
                    {userReservation.class === "Business"
                      ? departingFlight.businessPrice
                      : departingFlight.economyPrice}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "0% 4% 6%",
                  gap: "0.4rem",
                }}
              >
                <Typography
                  display="inline"
                  ariant="body1"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Total Price: x {userReservation.passengers.length}{" "}
                  <PersonOutlineIcon style={{ alignSelf: "center" }} />
                </Typography>

                <Tooltip title="Price">
                  <PaidRoundedIcon
                    fontSize="medium"
                    style={{ marginRight: "0.2%" }}
                  />
                </Tooltip>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                >
                  EGP{" "}
                  {userReservation.class === "Business"
                    ? departingFlight.businessPrice *
                      userReservation.passengers.length
                    : departingFlight.economyPrice *
                      userReservation.passengers.length}
                </Typography>
              </div>
              <Grid
                container
                alignItems="stretch"
                spacing={3}
                style={{ marginTop: "2%" }}
              >
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "15%",
                      marginLeft: "5%",
                    }}
                  >
                    <Button
                      align="right"
                      style={{
                        width: 200,
                        margin: "auto",
                        marginTop: "4%",
                        fontSize: "1.1rem",
                      }}
                      variant="contained"
                      color="primary"
                      disabled={
                        cancelPressed || userReservation.status === "Cancelled"
                          ? true
                          : false
                      }
                      onClick={(e) => handleEditSeat(e, departingFlight._id)}
                    >
                      Edit Seats
                    </Button>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "15%",
                      marginLeft: "5%",
                    }}
                  >
                    <Button
                      align="right"
                      style={{
                        width: 200,
                        margin: "auto",
                        marginTop: "4%",
                        fontSize: "1.1rem",
                      }}
                      variant="contained"
                      color="primary"
                      disabled={
                        cancelPressed || userReservation.status === "Cancelled"
                          ? true
                          : false
                      }
                      onClick={(e) => handleEditFlight(e, departingFlight._id)}
                    >
                      Edit Flight
                    </Button>
                  </div>
                </Grid>
              </Grid>
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
              <Typography
                variant="h5"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "4% 4% 2%",
                  fontSize: "1.7rem",
                  fontWeight: 500,
                }}
              >
                Return Flight
              </Typography>
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
                  HNFEY ???{" "}
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
                  Fare: {userReservation.class}
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
                  ??? Carry-on bag included
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    textIndent: "20px",
                  }}
                >
                  ??? 2 checked bags included
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
                  gap: "0.4rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0% 4% 6%",
                    gap: "0.4rem",
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
                    Seats:
                  </Typography>
                  {userReservation.passengers.map((passenger, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div style={{ display: "flex", marginLeft: "2%" }}>
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: 400,
                            }}
                          >
                            {passenger.returnSeat.seatNumber}
                          </Typography>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
                <Typography
                  display="inline"
                  ariant="body1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Ticket Price:
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
                    EGP{" "}
                    {userReservation.class === "Business"
                      ? returnFlight.businessPrice
                      : returnFlight.economyPrice}{" "}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "0% 4% 6%",
                  gap: "0.4rem",
                }}
              >
                <Typography
                  display="inline"
                  ariant="body1"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Total Price: x {userReservation.passengers.length}{" "}
                  <PersonOutlineIcon style={{ alignSelf: "center" }} />
                </Typography>

                <Tooltip title="Price">
                  <PaidRoundedIcon
                    fontSize="medium"
                    style={{ marginRight: "0.2%" }}
                  />
                </Tooltip>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                >
                  EGP{" "}
                  {userReservation.class === "Business"
                    ? returnFlight.businessPrice *
                      userReservation.passengers.length
                    : returnFlight.economyPrice *
                      userReservation.passengers.length}
                </Typography>
              </div>
              <Grid
                container
                alignItems="stretch"
                spacing={3}
                style={{ marginTop: "2%" }}
              >
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "15%",
                      marginLeft: "5%",
                    }}
                  >
                    <Button
                      align="right"
                      style={{
                        width: 200,
                        margin: "auto",
                        marginTop: "4%",
                        fontSize: "1.1rem",
                      }}
                      variant="contained"
                      color="primary"
                      disabled={
                        cancelPressed || userReservation.status === "Cancelled"
                          ? true
                          : false
                      }
                      onClick={(e) => handleEditSeat(e, returnFlight._id)}
                    >
                      Edit Seats
                    </Button>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "15%",
                      marginLeft: "5%",
                    }}
                  >
                    <Button
                      align="right"
                      style={{
                        width: 200,
                        margin: "auto",
                        marginTop: "4%",
                        fontSize: "1.1rem",
                      }}
                      variant="contained"
                      color="primary"
                      disabled={
                        cancelPressed || userReservation.status === "Cancelled"
                          ? true
                          : false
                      }
                      onClick={(e) => handleEditFlight(e, returnFlight._id)}
                    >
                      Edit Flight
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container component="main" style={{ marginTop: "2%" }}>
        <Grid container alignItems="stretch" spacing={3}>
          <Grid item md={12}>
            <div
              key={userReservation._id}
              style={{
                display: "flex",
                borderRadius: "10px",
                backgroundColor: "#fff",
                flexDirection: "column",
                marginBottom: "4%",
              }}
            >
              {userReservation.passengers.map((passenger, index) => {
                return (
                  <React.Fragment key={index}>
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
                  </React.Fragment>
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
