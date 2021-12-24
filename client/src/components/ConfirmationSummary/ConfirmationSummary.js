import React from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from "@material-ui/core";
import FlightIcon from "@mui/icons-material/Flight";
import moment from "moment";
import getTimeDifference from "../../utils/time";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { useHistory } from "react-router";

const ConfirmationSummary = (props) => {
  const details = props?.location?.state;
  const {
    departingFlight,
    returnFlight,
    departingFlightSeats,
    returnFlightSeats,
    passengers,
    reservation,
  } = details;

  const history = useHistory();

  const handleFinish = async (e) => {
    history.push("/all-reservations");
  };

  return (
    <Container component="main" style={{ marginTop: "2%" }}>
      <br />
      <Paper elevation={6} style={{ margin: "5% 0% 2%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1%",
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontSize: "1.4rem",
              fontWeight: 600,
              margin: "4% 0% 2% 3%",
            }}
          >
            Your Reservation has been confirmed
          </Typography>
        </div>
        <hr style={{ width: "95%" }} />
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
                flexDirection: "column",
                marginLeft: "3%",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  margin: "1% 0% 0% 3%",
                }}
              >
                Confirmation Number
              </Typography>
            </div>
          </Grid>
          <Grid item md={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "3%",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  margin: "1% 0% 0% 3%",
                }}
              >
                Confirmation Date
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="stretch" spacing={3}>
          <Grid item md={6} style={{ paddingTop: "0%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1%",
                marginLeft: "3%",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  margin: "1% 0% 1% 3%",
                }}
              >
                {reservation.index}
              </Typography>
              <hr />
            </div>
          </Grid>
          <Grid item md={6} style={{ paddingTop: "0%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1%",
                marginLeft: "3%",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  margin: "1% 0% 1% 3%",
                }}
              >
                {moment().format("DD-MM-YYYY")} {/* today's date* */}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <hr style={{ width: "95%" }} />
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
                marginLeft: "2%",
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
                  )}{" "}
                  hours
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
                    {reservation.class === "Business"
                      ? departingFlight.businessPrice
                      : departingFlight.economyPrice}{" "}
                    EGP
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
                  x{Number(passengers)} Passengers
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
                  display="inline"
                  ariant="body1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Seats:
                </Typography>
                {departingFlightSeats.map((depSeat) => (
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                    }}
                  >
                    {depSeat.seatNumber}
                  </Typography>
                ))}
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
                marginLeft: "2%",
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
                  )}{" "}
                  hours
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
                    {reservation.class === "Business"
                      ? returnFlight.businessPrice
                      : returnFlight.economyPrice}{" "}
                    EGP
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
                  x{Number(passengers)} Passengers
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
                  display="inline"
                  ariant="body1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Seats:
                </Typography>

                {returnFlightSeats.map((returnSeat) => (
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                    }}
                  >
                    {returnSeat.seatNumber}
                  </Typography>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
        <hr style={{ width: "95%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2%",
          }}
        >
          <Typography
            variant="body1"
            display="inline"
            style={{
              margin: "2% 3% 0%",
              fontSize: "1.5rem",
              fontWeight: 500,
            }}
          >
            Price summary
          </Typography>
        </div>
        {[...Array(Number(passengers)).keys()].map((passenger, i) => (
          <div key={i}>
            <div
              style={{
                margin: "3% 5% 2%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  flexGrow: 1,
                }}
              >
                Passenger {i + 1}
              </Typography>
              <Typography
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                }}
              >
                EGP{" "}
                {reservation.class === "Business"
                  ? departingFlight.businessPrice + returnFlight.businessPrice
                  : departingFlight.economyPrice + returnFlight.economyPrice}
              </Typography>
            </div>
            <div
              style={{
                margin: "1% 5% 3%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  flexGrow: 1,
                }}
              >
                Departure Flight
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 300,
                }}
              >
                EGP
                {reservation.class === "Business"
                  ? departingFlight.businessPrice
                  : departingFlight.economyPrice}
              </Typography>
            </div>
            <div
              style={{
                margin: "1% 5% 0%",
                display: "flex",
                flexDirection: "row",
                marginBottom: "1%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  flexGrow: 1,
                }}
              >
                Return Flight
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 300,
                }}
              >
                EGP
                {reservation.class === "Business"
                  ? returnFlight.businessPrice
                  : returnFlight.economyPrice}
              </Typography>
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            margin: "5%",
            paddingBottom: "4%",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontSize: "1.4rem",
              fontWeight: 500,
              flexGrow: 1,
            }}
          >
            Trip total
          </Typography>
          <Typography
            variant="h4"
            style={{
              fontSize: "1.4rem",
              fontWeight: 500,
            }}
          >
            EGP{" "}
            {reservation.class === "Business"
              ? (departingFlight.businessPrice + returnFlight.businessPrice) *
                passengers
              : (departingFlight.economyPrice + returnFlight.economyPrice) *
                passengers}
          </Typography>
        </div>
      </Paper>
      <Button
        type="submit"
        style={{ width: 500, marginLeft: "30%" }}
        onClick={handleFinish}
        variant="contained"
        color="primary"
      >
        Finish
      </Button>
    </Container>
  );
};

export default ConfirmationSummary;
