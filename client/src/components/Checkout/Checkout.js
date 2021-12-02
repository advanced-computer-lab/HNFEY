import {
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Box,
  InputLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Checkout = (props) => {
  const details = props?.location?.state;
  const {
    departingFlight,
    returnFlight,
    departingFlightSeats,
    returnFlightSeats,
    passengers,
    cabin,
  } = details;

  const [departureSeatsAvailable, setDepartureSeatsAvailable] =
    useState(departingFlightSeats);
  console.log(departureSeatsAvailable);
  const [returnSeatsAvailable, setReturnSeatsSAvailable] =
    useState(returnFlightSeats);

  const [passengerInfo, setPassengerInfo] = useState([]);

  const handleChange = (e, i) => {
    if (e.target.name === "departureSeat") {
      let passengerInfoArray = passengerInfo;
      let newInfo;
      newInfo = {
        ...passengerInfoArray[i],
        departureSeat: e.target.value,
      };
      passengerInfoArray[i] = newInfo;
      setPassengerInfo(() => passengerInfoArray);
      setDepartureSeatsAvailable((prev) =>
        prev.map((seat) =>
          seat === e.target.value ? { ...seat, selected: true } : null
        )
      );
    }
  };

  console.log(passengerInfo);
  console.log(passengerInfo[0]?.departureSeat);

  return details ? (
    <Container component="main" style={{ marginTop: "6rem" }}>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item xs={8}>
          <div style={{ display: "flex" }}>
            <Typography
              variant="body1"
              display="inline"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2.2rem",
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
            <Typography style={{ fontWeight: 700 }}>Checkout</Typography>
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: "10px",
              backgroundColor: "#fff",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "2rem",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  marginBottom: "1rem",
                }}
              >
                Travelers Information
              </Typography>
              <Typography
                variant="body2"
                style={{ fontSize: "0.875rem", fontWeight: 300 }}
              >
                Traveler names must match government-issued photo ID exactly.
              </Typography>
            </div>
            {[...Array(Number(passengers)).keys()].map((passenger, i) => {
              return (
                <div
                  key={i}
                  style={{
                    margin: "2rem 2rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginBottom: "1rem",
                    }}
                  >
                    Traveler {i + 1}: {i === 0 ? "primary contact" : ""}
                  </Typography>
                  <Grid container alignItems="stretch" spacing={3}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          marginBottom: "0.5rem",
                        }}
                      >
                        First Name:
                      </Typography>
                      <TextField
                        name="firstName"
                        onChange={handleChange}
                        style={{ width: "12.5rem" }}
                        variant="outlined"
                        placeholder="John"
                        type="text"
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          marginBottom: "0.5rem",
                        }}
                      >
                        Last Name:
                      </Typography>
                      <TextField
                        name="lastName"
                        onChange={handleChange}
                        style={{ width: "12.5rem" }}
                        variant="outlined"
                        placeholder="Doe"
                        type="text"
                        required
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          marginBottom: "0.5rem",
                        }}
                      >
                        Departure Flight Seat:
                      </Typography>
                      <Box sx={{ width: "12.5rem" }}>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            variant="outlined"
                            id="demo-simple-select"
                            name="departureSeat"
                            value={
                              passengerInfo[i]?.departureSeat
                                ? passengerInfo[i].departureSeat
                                : departureSeatsAvailable[0]
                            }
                            onChange={(e) => handleChange(e, i)}
                          >
                            {departureSeatsAvailable.map((seat) =>
                              seat.selected ? (
                                <MenuItem value={seat} disabled key={seat._id}>
                                  {seat.seatNumber}
                                </MenuItem>
                              ) : (
                                <MenuItem value={seat} key={seat._id}>
                                  {seat.seatNumber}
                                </MenuItem>
                              )
                            )}
                            {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          marginBottom: "0.5rem",
                        }}
                      >
                        Return Flight Seat:
                      </Typography>
                      <Box sx={{ width: "12.5rem" }}>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            variant="outlined"
                            id="demo-simple-select"
                            name="returnSeat"
                            value={
                              passengerInfo[i]?.returnSeat
                                ? passengerInfo[i].returnSeat
                                : returnSeatsAvailable[0]
                            }
                            onChange={(e) => handleChange(e, i)}
                          >
                            {returnSeatsAvailable.map((seat) => (
                              <MenuItem value={seat} key={seat._id}>
                                {seat.seatNumber}
                              </MenuItem>
                            ))}
                            {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          marginBottom: "0.5rem",
                        }}
                      >
                        Passport Number:
                      </Typography>
                      <TextField
                        name="passportNumber"
                        onChange={handleChange}
                        style={{ width: "12.5rem" }}
                        variant="outlined"
                        placeholder="231606057"
                        type="text"
                        required
                      />
                    </Grid>
                  </Grid>
                </div>
              );
            })}
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

export default Checkout;
