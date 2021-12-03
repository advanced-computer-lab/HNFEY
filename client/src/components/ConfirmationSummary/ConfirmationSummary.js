import React from "react";
import { Container, Grid, Paper, Typography, Tooltip } from "@material-ui/core";
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

const ConfirmationSummary = () => {
  return (
    <div>
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
                  1234
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
                  12/12/2021
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
                //key={flight._id}
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
                    {/* {flight.from.split(" ")[0]} to {flight.to.split(" ")[0]}{" "} */}
                    Cairo to Denmark
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
                    {/* HNFEY • {moment(flight.departureDay).format("ddd, MMM Do")} */}
                    12/12/2021
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
                    {/* {moment(flight.departureDateTime).format("hh:mm A")} -{" "}
                {moment(flight.arrivalDateTime).format("hh:mm A")} */}
                    10/10/2021-15/10/2012
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "0.875rem", fontWeight: 300 }}
                  >
                    {/* {getTimeDifference(
                  flight.departureDateTime,
                  flight.arrivalDateTime
                )} */}
                    5 hours
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
                    Fare: Economy
                    {/* {fare} */}
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
                      {/* {flight.baggageAllowance} */}
                      46 KG
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
                      {/* {flight.price}  */}
                      200 EGP
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item md={6}>
              <div
                //key={flight._id}
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
                    {/* {flight.from.split(" ")[0]} to {flight.to.split(" ")[0]}{" "} */}
                    Cairo to Denmark
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
                    {/* HNFEY • {moment(flight.departureDay).format("ddd, MMM Do")} */}
                    12/12/2021
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
                    {/* {moment(flight.departureDateTime).format("hh:mm A")} -{" "}
                {moment(flight.arrivalDateTime).format("hh:mm A")} */}
                    10/10/2021-15/10/2012
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "0.875rem", fontWeight: 300 }}
                  >
                    {/* {getTimeDifference(
                  flight.departureDateTime,
                  flight.arrivalDateTime
                )} */}
                    5 hours
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
                    Fare: Economy
                    {/* {fare} */}
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
                      {/* {flight.baggageAllowance} */}
                      46 KG
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
                      {/* {flight.price}  */}
                      200 EGP
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default ConfirmationSummary;
