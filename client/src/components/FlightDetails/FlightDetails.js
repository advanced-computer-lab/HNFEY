import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";

const FlightDetails = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState([]);
  const url = "http://localhost:8000/hnfey/flight/" + id;
  var counter = 0;

  useEffect(() => {
    axios.get(url).then((res) => setFlight(res.data.flight));
  }, [url]);

  return flight ? (
    <Container style={{ marginTop: "70px" }}>
      {/* <h1>{flight.flightNumber}</h1>
      <h1>{flight.to}</h1>

      <h1>{flight.arrivalDateTime}</h1>
      <h1>{flight.arrivalTerminal}</h1>
      <h1>{flight.departureDateTime}</h1>
      <h1>{flight.price}</h1>
      <h1>{flight.to}</h1> */}
      {Object.entries(flight).map((entry) => {
        let [key, value] = entry;
        let result = key.replace(/([A-Z])/g, " $1");
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);

        if (
          key !== "numberOfAvailableEconomySeats" &&
          key !== "numberOfAvailableBusinessSeats" &&
          key !== "numberOfEconomySeats" &&
          key !== "numberOfBusinessSeats" &&
          key !== "departureDay" &&
          key !== "arrivalDay" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "_id" &&
          key !== "__v"
        ) {
          counter++;
          switch (key) {
            case "departureDateTime":
            case "arrivalDateTime":
              return (
                <Typography variant="h6" key={counter}>
                  {key === "departureDateTime" ? "Departing" : "Arriving"}:{" "}
                  {moment(value).format("DD-MM-YYYY hh:mm A")}
                </Typography>
              );
            case "baggageAllowance":
            case "price":
              return (
                <Typography variant="h6" key={counter}>
                  {finalResult}: {value}{" "}
                  {key === "baggageAllowance" ? "KG" : "EGP"}
                </Typography>
              );
            default:
              return (
                <Typography variant="h6" key={counter}>
                  {finalResult}: {value}
                </Typography>
              );
          }
        }
        return null;
      })}
    </Container>
  ) : null;
};

export default FlightDetails;
