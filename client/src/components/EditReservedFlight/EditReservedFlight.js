import React from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Paper,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import getTimeDifference from "../../utils/time";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { editFlight, findFlight } from "../../api/flight";
import { editReservation } from "../../api/reservation";

const EditReservedFlight = (props) => {
  const history = useHistory();
  const reservedflight = props.location.state.flight;
  const flightType = props.location.state.flightType;
  const reservation = props.location.state.userReservation;
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState("Economy");
  const [flightDetails, setFlightDetails] = useState({
    to: reservedflight.to,
    from: reservedflight.from,
    class: selected,
    passengers: reservation.passengers.length,
  });
  const [resultFlightList, setResultFlightList] = useState([]);
  const [selectedFlightID, setSelectedFlightID] = useState("");
  const editReservationUrl =
    "http://localhost:8000/hnfey/reservation/edit-reservation";

  const handleChange = (e) => {
    if (e.target.name === "class") {
      setSelected(e.target.value);
    }
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };

  const handleSelectFlight = (flightID) => {
    setSelectedFlightID((prev) => (prev !== flightID ? flightID : ""));
  };

  useEffect(() => {
    if (resultFlightList.length !== 0) {
      setSearched(() => true);
    }
  }, [resultFlightList, searched]);

  const handleSearch = (e) => {
    e.preventDefault();
    let findFlightsUrl = "http://localhost:8000/hnfey/flight/?";
    const noOfKeys = Object.keys(flightDetails).length;
    Object.entries(flightDetails).map((entry, i) => {
      let [key, value] = entry;
      let last = i + 1 === noOfKeys ? "" : "&";
      return (findFlightsUrl += key + "=" + value + last);
    });
    findFlight(findFlightsUrl).then((res) => {
      setResultFlightList(res.data.flights);
    });
  };

  const handleSubmit = () => {
    if (selectedFlightID) {
      let flightUrl = "http://localhost:8000/hnfey/flight/";

      confirmAlert({
        title: "Are you sure you want to reserve this flight?",
        message: "Click yes if you want to reserve this flight, no otherwise.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              reservation.passengers.forEach((passenger) => {
                reservedflight.seats.forEach((seat) => {
                  if (passenger.departureSeat.seatNumber === seat.seatNumber)
                    seat.reserved = false;
                });
              });
              if (reservation.class === "Economy") {
                reservedflight.numberOfAvailableEconomySeats +=
                  reservation.passengers.length;
              } else {
                reservedflight.numberOfAvailableBusinessSeats +=
                  reservation.passengers.length;
              }
              if (flightType === "Departure flight") {
                const reservationBody = {
                  reservation: {
                    _id: reservation._id,
                    departingFlightId: selectedFlightID,
                  },
                };
                const flightBody = {
                  flight: {
                    _id: reservedflight._id,
                    seats: reservedflight.seats,
                    numberOfAvailableEconomySeats:
                      reservedflight.numberOfAvailableEconomySeats,
                    numberOfAvailableBusinessSeats:
                      reservedflight.numberOfAvailableBusinessSeats,
                  },
                };
                editReservation(reservationBody);
                editFlight(flightBody);
                reservation.departingFlightId = selectedFlightID;
                flightUrl += selectedFlightID;
                delete props.location.state.userReservation;
                findFlight(flightUrl).then((res) => {
                  history.push("/change-seats", {
                    ...props.location.state,
                    flight: res.data.flight,
                    flightType: flightType,
                    passengerNo: 0,
                    userReservation: reservation,
                    newFlight: true,
                  });
                });
              } else {
                const reservationBody = {
                  reservation: {
                    _id: reservation._id,
                    returnFlightId: selectedFlightID,
                  },
                };
                const flightBody = {
                  flight: {
                    _id: reservedflight._id,
                    seats: reservedflight.seats,
                    numberOfAvailableEconomySeats:
                      reservedflight.numberOfAvailableEconomySeats,
                    numberOfAvailableBusinessSeats:
                      reservedflight.numberOfAvailableBusinessSeats,
                  },
                };
                editReservation(reservationBody);
                editFlight(flightBody);
                reservation.returnFlightId = selectedFlightID;
                flightUrl += selectedFlightID;
                delete props.location.state.userReservation;
                findFlight(flightUrl).then((res) => {
                  history.push("/change-seats", {
                    ...props.location.state,
                    flight: res.data.flight,
                    flightType: flightType,
                    passengerNo: 0,
                    userReservation: reservation,
                    newFlight: true,
                  });
                });
              }
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } else {
      delete props.location.state.flight;
      delete props.location.state.flightType;
      delete props.location.state.departureFlightDate;
      delete props.location.state.returnFlightDate;
      history.push("/reservation", props.location.state);
    }
  };

  return reservedflight._id ? (
    <div>
      <Container component="main" align="center" style={{ marginTop: "7%" }}>
        <form onSubmit={handleSearch}>
          <br />
          <Typography
            variant="h4"
            color="textSecondary"
            style={{ marginBottom: "4%" }}
          >
            {flightType === "Departure flight"
              ? "Search for a Departure Flight"
              : "Search for a Return Flight"}
          </Typography>

          <TextField
            style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}
            name="from"
            variant="outlined"
            label="From"
            value={reservedflight.from}
            type="text"
            disabled
          />

          <TextField
            style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}
            name="to"
            variant="outlined"
            label="To"
            value={reservedflight.to}
            type="text"
            disabled
          />

          <TextField
            style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}
            name="departureDay"
            onChange={handleChange}
            variant="outlined"
            label="Departure Date"
            InputProps={{
              inputProps:
                flightType === "Departure flight"
                  ? {
                      min: moment().format("YYYY-MM-DD"),
                      max: moment(props.location.state.returnFlightDate).format(
                        "YYYY-MM-DD"
                      ),
                    }
                  : {
                      min: moment(
                        props.location.state.departureFlightDate
                      ).format("YYYY-MM-DD"),
                    },
            }}
            InputLabelProps={{ shrink: true }}
            type="date"
            value={flightDetails.depatureDay}
            required={searched ? false : true}
            disabled={searched ? true : false}
          />

          <FormControl style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{
                position: "absolute",
                textIndent: 15,
                bottom: 10,
              }}
              required
            >
              Class
            </InputLabel>
            <Select
              style={{
                minWidth: 160,
                maxWidth: 200,
                margin: "0px 5px 10px 0px",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Class"
              name="class"
              value={selected}
              variant="outlined"
              disabled={searched ? true : false}
              onChange={handleChange}
            >
              <MenuItem value={"Economy"}>Economy</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
            </Select>
          </FormControl>

          <TextField
            style={{ minWidth: 180, maxWidth: 200, margin: "0px 5px 10px 0px" }}
            name="passengers"
            variant="outlined"
            label="Passengers"
            type="number"
            value={reservation.passengers.length}
            InputProps={{ inputProps: { min: 0, max: 9 } }}
            disabled
          />

          <br />

          <Button
            style={{
              width: 200,
              marginTop: "20px",
              display: !searched ? "inline" : "none",
            }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </form>
      </Container>

      <Container
        component="main"
        style={{ marginTop: "4%", display: searched ? "block" : "none" }}
      >
        <Typography variant="h4" style={{ fontWeight: 600, color: "#666" }}>
          Search Results
        </Typography>
        <br />
        <Paper elevation={5} style={{ margin: " 2% 7%" }}>
          {resultFlightList.map((flight, i) => (
            <div
              key={flight._id}
              style={{ paddingTop: "2%", paddingBottom: "3%" }}
            >
              <Grid
                container
                alignItems="center"
                spacing={3}
                style={{ margin: "0% 1%" }}
              >
                <Grid item md={3}>
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "2%", marginTop: "5%" }}
                  >
                    {moment(flight.departureDateTime).format("hh:mm A")}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: "2%" }}>
                    {flight.from}
                  </Typography>
                  <Typography variant="body2">
                    {moment(flight.departureDay).format("dddd, MMMM Do YYYY")}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "2%",
                    }}
                  >
                    <Tooltip title="Departing terminal">
                      <AirplaneTicketIcon
                        fontSize="small"
                        style={{ color: "#666", marginInline: "2%" }}
                      />
                    </Tooltip>
                    <Typography variant="body2" display="inline">
                      {flight.departureTerminal}
                    </Typography>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "3%",
                    }}
                  >
                    <Tooltip title="Departure">
                      <FlightTakeoff
                        fontSize="large"
                        style={{ color: "#666", marginInline: "6%" }}
                      />
                    </Tooltip>
                    <Typography
                      variant="h6"
                      style={{ color: "#666", marginInline: "6%" }}
                    >
                      {getTimeDifference(
                        flight.departureDateTime,
                        flight.arrivalDateTime
                      )}
                    </Typography>
                    <Tooltip title="Arrival">
                      <FlightLandIcon
                        fontSize="large"
                        style={{ color: "#666", marginInline: "6%" }}
                      />
                    </Tooltip>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip title="Baggage allowance">
                      <LuggageIcon
                        fontSize="medium"
                        style={{ color: "#666", marginInline: "1%" }}
                      />
                    </Tooltip>
                    <br />
                    <Typography display="inline" variant="body2">
                      {flight.baggageAllowance} KG
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography display="inline" variant="body2">
                      Price difference{" "}
                    </Typography>
                    <Tooltip title="Price">
                      <AttachMoneyIcon
                        fontSize="medium"
                        style={{ color: "#666" }}
                      />
                    </Tooltip>
                    <Typography display="inline" variant="body2">
                      {reservation.class === "Business"
                        ? props.location.state.flight.businessPrice -
                          flight.businessPrice
                        : props.location.state.flight.economyPrice -
                          flight.economyPrice}{" "}
                      EGP
                    </Typography>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "2%", marginTop: "5%" }}
                  >
                    {moment(flight.arrivalDateTime).format("hh:mm A")}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: "2%" }}>
                    {flight.to}
                  </Typography>
                  <Typography variant="body2">
                    {moment(flight.arrivalDay).format("dddd, MMMM Do YYYY")}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "2%",
                    }}
                  >
                    <Tooltip title="Arriving terminal">
                      <AirplaneTicketIcon
                        fontSize="small"
                        style={{ color: "#666", marginInline: "2%" }}
                      />
                    </Tooltip>
                    <Typography variant="body2" display="inline">
                      {flight.arrivalTerminal}
                    </Typography>
                  </div>
                </Grid>
                <Grid
                  item
                  md={2}
                  style={{
                    paddingLeft: "0%",
                  }}
                >
                  <Button
                    variant="outlined"
                    disabled={reservedflight._id === flight._id ? true : false}
                    style={{
                      width: "80%",
                      borderColor:
                        reservedflight._id === flight._id
                          ? "#808080"
                          : "#084C61",
                      color:
                        reservedflight._id === flight._id
                          ? "#808080"
                          : selectedFlightID !== flight._id
                          ? "#084C61"
                          : "#FFF",
                      backgroundColor:
                        selectedFlightID === flight._id ? "#084C61" : "#FFF",
                    }}
                    onClick={() => handleSelectFlight(flight._id)}
                  >
                    {reservedflight._id === flight._id
                      ? "Reserved Flight"
                      : selectedFlightID === flight._id
                      ? "Flight Selected"
                      : "Select Flight"}
                  </Button>
                </Grid>
              </Grid>
            </div>
          ))}
        </Paper>
        <div style={{ marginTop: "3%", display: "flex", marginBottom: "5%" }}>
          <Button
            style={{
              width: 250,
              marginTop: "20px",
              margin: "auto",
            }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Proceed
          </Button>
        </div>
      </Container>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default EditReservedFlight;
