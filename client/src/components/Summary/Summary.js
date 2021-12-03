import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import FlightIcon from "@mui/icons-material/Flight";
import moment from "moment";
import getTimeDifference from "../../utils/time";
import PowerIcon from "@mui/icons-material/Power";
import WifiIcon from "@mui/icons-material/Wifi";
import AccessibleIcon from "@mui/icons-material/Accessible";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router";

const Summary = (props) => {
  const fare = props.location.state.class;
  const passengers = props.location.state.passengers;
  const [departingFlight, setDepartingFlight] = useState({});
  const [returnFlight, setReturnFlight] = useState({});
  const flights = [departingFlight, returnFlight];
  const history = useHistory();

  useEffect(() => {
    setDepartingFlight(props.location.state.departingFlight);
    setReturnFlight(props.location.state.returnFlight);
  }, [props.location.state]);

  const submit = () => {
    confirmAlert({
      title: "Are you sure you want to reserve this flight?",
      message: "Click yes if you want to reserve this flight, no otherwise.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            if (props.location.state.username) {
              history.push("/flight/seat-selection", {
                username: props.location.state.username,
                flightToSelect: {
                  ...departingFlight,
                  class: fare,
                  passengers: Number(passengers),
                },
                flightInQueue: {
                  ...returnFlight,
                  class: fare,
                  passengers: Number(passengers),
                },
              });
            } else {
              history.push("/login", {
                flightToSelect: {
                  ...departingFlight,
                  class: fare,
                  passengers: Number(passengers),
                },
                flightInQueue: {
                  ...returnFlight,
                  class: fare,
                  passengers: Number(passengers),
                },
              });
            }
            // handleDelete();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return departingFlight?._id && returnFlight?._id && flights.length > 0 ? (
    <Container component="main" style={{ marginTop: "6%" }}>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item md={8}>
          <div style={{ display: "flex" }}>
            <Typography
              variant="body1"
              display="inline"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              HNFEY • {departingFlight.from}{" "}
              <ArrowForwardIcon fontSize="small" /> {departingFlight.to}
              {"  "}
              <ArrowForwardIosIcon fontSize="small" />
              {"  "}HNFEY • {returnFlight.from}{" "}
              <ArrowForwardIcon fontSize="small" /> {returnFlight.to}
              <ArrowForwardIosIcon fontSize="small" />
            </Typography>
            <Typography style={{ fontWeight: 700 }}>
              Review your trip
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: "10px",
              backgroundColor: "#fff",
              alignItems: "center",
              marginBottom: "4%",
            }}
          >
            <CheckIcon style={{ marginLeft: "2%", color: "#" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2% 0%",
              }}
            >
              <Typography
                variant="body1"
                style={{ marginInline: "4%", fontWeight: "500" }}
              >
                No change fees for all flights
              </Typography>
              <Typography variant="body2" style={{ marginInline: "4%" }}>
                You can change these flights without paying a fee if plans
                change. Because flexibility matters.
              </Typography>
            </div>
          </div>
          {flights.map((flight) => (
            <div
              key={flight._id}
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
                    <PowerIcon
                      fontSize="small"
                      style={{ marginRight: "0.2%" }}
                    />
                  </Tooltip>
                  <Tooltip title="Wifi">
                    <WifiIcon
                      fontSize="small"
                      style={{ marginInline: "0.2%" }}
                    />
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
                  Fare: {fare}
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
                    {flight.price} EGP
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </Grid>
        <Grid item md={4}>
          <div>
            <div
              style={{
                margin: "17% 3% 0%",
                display: "flex",
                flexDirection: "column",
                marginBottom: "5%",
                borderRadius: "7px",
                backgroundColor: "#fff",
              }}
            >
              <Typography
                variant="body1"
                display="inline"
                style={{
                  margin: "2% 5% 5%",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                }}
              >
                Price summary
              </Typography>

              {[...Array(Number(passengers)).keys()].map((passenger, i) => (
                <div key={i}>
                  <div
                    style={{
                      margin: "3% 5% 0%",
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "5%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        flexGrow: 1,
                      }}
                    >
                      Passenger {passenger + 1}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      EGP {""}
                      {departingFlight.price + returnFlight.price}
                    </Typography>
                  </div>
                  <div
                    style={{
                      margin: "1% 5% 0%",
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "5%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 300,
                        flexGrow: 1,
                      }}
                    >
                      Departure Flight
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 300,
                      }}
                    >
                      EGP {departingFlight.price}
                    </Typography>
                  </div>
                  <div
                    style={{
                      margin: "1% 5% 0%",
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "5%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 300,
                        flexGrow: 1,
                      }}
                    >
                      Return Flight
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 300,
                      }}
                    >
                      EGP {returnFlight.price}
                    </Typography>
                  </div>
                </div>
              ))}
              <div
                style={{
                  margin: "1% 5% 1%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    flexGrow: 1,
                  }}
                >
                  Trip total
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 500,
                  }}
                >
                  EGP{" "}
                  {(departingFlight.price + returnFlight.price) * passengers}
                </Typography>
              </div>
              <div
                style={{
                  margin: "1% 5% 15%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontSize: "0.625rem", fontWeight: 300 }}
                >
                  Rates are quoted in Egyptian Pounds
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0% 10% 5%",
                }}
              >
                <Button
                  type="submit"
                  onClick={submit}
                  style={{ width: 500 }}
                  variant="contained"
                  color="primary"
                >
                  Check out
                </Button>
              </div>
            </div>
            <div
              style={{
                margin: "17% 3% 0%",
                display: "flex",
                flexDirection: "row",
                marginBottom: "5%",
                borderRadius: "7px",
                backgroundColor: "#fff",
              }}
            >
              <AccessTimeFilledIcon
                fontSize="large"
                style={{ color: "#329F5B", margin: "5% 1% 5% 3%" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5%",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Free cancellation
                </Typography>
                <Typography
                  variant="h4"
                  style={{ fontSize: "0.875rem", fontWeight: 300 }}
                >
                  There's no fee to cancel within 24 hours of booking.
                </Typography>
              </div>
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

export default Summary;
