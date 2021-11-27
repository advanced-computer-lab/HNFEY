import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export const FlightList = () => {
  const [departureFlightList, setDepartureList] = useState([]);
  const [returnFlightList, setReturnList] = useState([]);

  const location = useLocation();
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
    Axios.get(departureUrl).then((res) => setDepartureList(res.data.flights));
    Axios.get(returnUrl).then((res) => setReturnList(res.data.flights));
  }, [departureUrl, returnUrl]); //might be flights

  return departureFlightList && returnFlightList ? (
    <div>
      <Container style={{ marginTop: "100px" }}>
        Choose your departure flight
        <br />
        <br />
        {departureFlightList?.map((flight) => (
          <Link to={"/"}>
            <Card style={{ width: "50%", height: "100px" }}>
              {moment(flight.departureDateTime).format("hh:mm A")} -{" "}
              {moment(flight.arrivalDateTime).format("hh:mm A")}
              <br />
              {flight.from} - {flight.to}
            </Card>
          </Link>
        ))}
      </Container>

      <Container style={{ marginTop: "100px" }}>
        Choose your return flight
        <br />
        <br />
        {returnFlightList?.map((flight) => (
          <Link to={"/"}>
            <Card style={{ width: "50%", height: "100px" }}>
              {moment(flight.departureDateTime).format("hh:mm A")} -{" "}
              {moment(flight.arrivalDateTime).format("hh:mm A")}
              <br />
              {flight.from} - {flight.to}
            </Card>
          </Link>
        ))}
      </Container>
    </div>
  ) : null;
};

export default FlightList;
