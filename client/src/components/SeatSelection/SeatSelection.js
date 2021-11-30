import { Container, Grid, Tooltip, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PowerIcon from "@mui/icons-material/Power";
import WifiIcon from "@mui/icons-material/Wifi";
import AccessibleIcon from "@mui/icons-material/Accessible";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import FlightIcon from "@mui/icons-material/Flight";
import { ReactComponent as Seat } from "./images/seat.svg";
import seatIcon from "./images/seat.svg";
import moment from "moment";
import getTimeDifference from "../../utils/time";

const SeatSelection = (props) => {
  const flight = props.location.state.flightToSelect;
  const [seatsSelected, setSeatsSelected] = useState(0);

  return (
    <Container component="main" style={{ marginTop: "6%" }}>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item md={6}>
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
              Seat Selection
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
              Flight summary
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
        </Grid>
        <Grid item md={6}>
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
            <div style={{ margin: "2%", display: "flex" }}>
              <Typography
                variant="h3"
                style={{ fontSize: "1.5rem", fontWeight: 500 }}
              >
                Select your seats
              </Typography>
            </div>

            <div style={{ display: "flex", margin: "2%" }}>
              <Grid container alignItems="stretch" spacing={3}>
                <Grid item md={4}>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "1rem", fontWeight: 400 }}
                  >
                    Passengers: {flight.passengers}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "1rem", fontWeight: 400 }}
                  >
                    Seats Selected: {seatsSelected}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "1rem", fontWeight: 400 }}
                  >
                    Seats Left: {flight.passengers - seatsSelected}
                  </Typography>
                </Grid>
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
                Business Class
              </Typography>
            </div>
            <div style={{ display: "flex", margin: "2%" }}>
              <Grid container alignItems="stretch">
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>

                {[...Array(flight.numberOfBusinessSeats).keys()].map(
                  (businessSeat, i) => {
                    if (i % 6 === 0) {
                      return (
                        <>
                          <Grid item md={1}>
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

                          <Grid item md={1}>
                            <div style={{ cursor: "not-allowed" }}>
                              <Seat
                                fill={flight.class === "Business" ? "" : "#666"}
                                style={{ width: "25px", height: "25px" }}
                              />
                            </div>
                          </Grid>
                        </>
                      );
                    } else if (i % 6 === 5) {
                      return (
                        <>
                          <Grid item md={1}>
                            {/* <img
                              src={seatIcon}
                              alt=""
                              style={{ width: "25px", height: "25px" }}
                            /> */}
                            <Seat
                              fill={flight.class === "Business" ? "" : "#666"}
                              style={{ width: "25px", height: "25px" }}
                            />
                          </Grid>
                          <Grid item md={1}>
                            <div
                              style={{ width: "25px", height: "25px" }}
                            ></div>
                          </Grid>
                        </>
                      );
                    } else if (i % 2 === 1) {
                      return (
                        <>
                          <Grid item md={1}>
                            <Seat
                              fill={flight.class === "Business" ? "" : "#666"}
                              style={{ width: "25px", height: "25px" }}
                            />
                          </Grid>
                          <Grid item md={2}>
                            <div
                              style={{ width: "80px", height: "25px" }}
                            ></div>
                          </Grid>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Grid item md={1}>
                            <Seat
                              fill={flight.class === "Business" ? "" : "#666"}
                              style={{ width: "25px", height: "25px" }}
                            />
                          </Grid>
                        </>
                      );
                    }
                  }
                )}
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
            <div style={{ display: "flex", margin: "2%" }}>
              <Grid container alignItems="stretch">
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>

                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
                  <div style={{ width: "25px", height: "25px" }}></div>
                </Grid>
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                <Grid item md={1}>
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
                {[...Array(flight.numberOfEconomySeats).keys()].map(
                  (economySeat, i) => {
                    if (i % 10 === 2) {
                      return (
                        <>
                          <Grid item md={1}>
                            <img
                              src={seatIcon}
                              style={{ width: "25px", height: "25px" }}
                              alt=""
                            />
                          </Grid>
                          <Grid item md={1}>
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
                                {Math.floor(i / 10) + 1}
                              </Typography>
                            </div>
                          </Grid>
                        </>
                      );
                    } else if (i % 10 === 6) {
                      return (
                        <>
                          <Grid item md={1}>
                            <img
                              src={seatIcon}
                              style={{ width: "25px", height: "25px" }}
                              alt=""
                            />
                          </Grid>
                          <Grid item md={1}>
                            <div
                              style={{ width: "25px", height: "25px" }}
                            ></div>
                          </Grid>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Grid item md={1}>
                            <img
                              src={seatIcon}
                              alt=""
                              style={{ width: "25px", height: "25px" }}
                            />
                          </Grid>
                        </>
                      );
                    }
                  }
                )}
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SeatSelection;
