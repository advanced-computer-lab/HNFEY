import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography, Grid, Paper, CircularProgress } from "@material-ui/core";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import getTimeDifference from "../../utils/time";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Tooltip from "@mui/material/Tooltip";

export const SearchResultsUser = () => {
  const [departureFlightList, setDepartureList] = useState([]);
  const [returnFlightList, setReturnList] = useState([]);
  const [selectedDepartureFlightID, setSelectedDepartureFlightID] =
    useState("");
  const [selectedReturnFlightID, setSelectedReturnFlightID] = useState("");
  const history = useHistory();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const searchClass = query.class;
  const passengers = query.passengers;

  const handleSelectDepartureFlight = (departureFlightID) => {
    setSelectedDepartureFlightID((prev) =>
      prev !== departureFlightID ? departureFlightID : ""
    );
  };

  const handleSelectReturnFlight = (returnFlightID) => {
    setSelectedReturnFlightID((prev) =>
      prev !== returnFlightID ? returnFlightID : ""
    );
  };

  const handleSubmit = () => {
    if (selectedDepartureFlightID === "" || selectedReturnFlightID === "") {
      alert("Please select a departure flight and a return flight");
    } else {
      const reservation = {
        departingFlight: departureFlightList.find(
          (flight) => flight._id === selectedDepartureFlightID
        ),
        returnFlight: returnFlightList.find(
          (flight) => flight._id === selectedReturnFlightID
        ),
        passengers: passengers,
        class: searchClass,
      };
      const url = "/flight-information";
      // +
      // "departingFlight=" +
      // selectedDepartureFlightID +
      // "&returnFlight=" +
      // selectedReturnFlightID +
      // "&passengers=" +
      // passengers +
      // "&class=" +
      // searchClass;

      history.push(url, reservation);
    }
  };

  let departureUrl = "http://localhost:8000/hnfey/flight/?";
  let returnUrl = "http://localhost:8000/hnfey/flight/?";
  let departureQuery = queryString.parse(location.search);
  const returnQuery = {
    from: departureQuery.to,
    to: departureQuery.from,
    departureDay: departureQuery.returnDate,
    passengers: departureQuery.passengers,
    class: departureQuery.class,
  };

  const noOfKeys = Object.keys(departureQuery).length;

  Object.entries(departureQuery).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (departureUrl += key + "=" + value + last);
  });

  Object.entries(returnQuery).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (returnUrl += key + "=" + value + last);
  });

  useEffect(() => {
    Axios.get(departureUrl).then((res) => {
      setDepartureList(res.data.flights);
    });
    Axios.get(returnUrl).then((res) => setReturnList(res.data.flights));
  }, [departureUrl, returnUrl]); //might be flights

  return departureFlightList.length > 0 && returnFlightList.length > 0 ? (
    <Container component="main" style={{ marginTop: "7%" }}>
      <Typography variant="h4" style={{ fontWeight: 600, color: "#666" }}>
        Choose your departing flight
      </Typography>
      <br />
      <Paper elevation={5} style={{ margin: "3% 0% 7%" }}>
        {departureFlightList.map((flight, i) => (
          <div key={flight._id}>
            <Grid
              container
              alignItems="center"
              spacing={3}
              style={{ margin: "0% 4%" }}
            >
              <Grid item md={3}>
                <Typography variant="h6" style={{ marginBottom: "2%" }}>
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
                  <Typography display="inline" variant="body2">
                    {flight.baggageAllowance} KG
                  </Typography>
                  <Tooltip title="Price">
                    <AttachMoneyIcon
                      fontSize="medium"
                      style={{ color: "#666", marginInline: "1%" }}
                    />
                  </Tooltip>
                  <Typography display="inline" variant="body2">
                    {searchClass === "Business"
                      ? flight.businessPrice
                      : flight.economyPrice}{" "}
                    EGP
                  </Typography>
                </div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="h6" style={{ marginBottom: "2%" }}>
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
              <Grid item md={1}>
                <Button
                  variant="outlined"
                  style={{
                    borderColor: "#084C61",
                    color:
                      selectedDepartureFlightID !== flight._id
                        ? "#084C61"
                        : "#FFF",
                    backgroundColor:
                      selectedDepartureFlightID === flight._id
                        ? "#084C61"
                        : "#FFF",
                  }}
                  onClick={() => handleSelectDepartureFlight(flight._id)}
                >
                  {selectedDepartureFlightID === flight._id
                    ? "Flight Selected"
                    : "Select Flight"}
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}
      </Paper>
      <Typography variant="h4" style={{ fontWeight: 600, color: "#666" }}>
        Choose your returning flight
      </Typography>
      <br />
      <Paper elevation={5} style={{ margin: "3% 0% 5%" }}>
        {returnFlightList.map((flight, i) => (
          <div key={flight._id}>
            <Grid
              container
              alignItems="stretch"
              spacing={3}
              style={{ margin: "0% 4%" }}
            >
              <Grid item md={3}>
                <Typography variant="h6" style={{ marginBottom: "2%" }}>
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
                  <Typography display="inline" variant="body2">
                    {flight.baggageAllowance} KG
                  </Typography>
                  <Tooltip title="Price">
                    <AttachMoneyIcon
                      fontSize="medium"
                      style={{ color: "#666", marginInline: "1%" }}
                    />
                  </Tooltip>
                  <Typography display="inline" variant="body2">
                    {searchClass === "Business"
                      ? flight.businessPrice
                      : flight.economyPrice}{" "}
                    EGP
                  </Typography>
                </div>
              </Grid>
              <Grid item md={3}>
                <Typography variant="h6" style={{ marginBottom: "2%" }}>
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
              <Grid item md={1}>
                <Button
                  variant="outlined"
                  style={{
                    borderColor: "#084C61",
                    color:
                      selectedReturnFlightID !== flight._id
                        ? "#084C61"
                        : "#FFF",
                    backgroundColor:
                      selectedReturnFlightID === flight._id
                        ? "#084C61"
                        : "#FFF",
                  }}
                  onClick={() => handleSelectReturnFlight(flight._id)}
                >
                  {selectedReturnFlightID === flight._id
                    ? "Flight Selected"
                    : "Select Flight"}
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}
      </Paper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "7%",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "#084C61", color: "#FFF" }}
          onClick={handleSubmit}
        >
          PROCEED
        </Button>
      </div>
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

export default SearchResultsUser;
