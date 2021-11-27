import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import Container from "@mui/material/Container";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export const FlightList = (props) => {
  const history = useHistory();
  const [departureFlightList, setDepartureList] = useState([]);
  const [dropdownArrowDeparture, setDropdownArrowDeparture] = useState([]);
  const [returnFlightList, setReturnList] = useState([]);
  const [selectedDepartureFlightID, setSelectedDepartureFlightID] =
    useState("");
  const [selectedReturnFlightID, setSelectedReturnFlightID] = useState("");
  var counter = 0;

  const handleSelectDepartureFlight = (departureFlightID) => {
    console.log(departureFlightID);
    setSelectedDepartureFlightID(departureFlightID);
  };

  const handleDropdownClick = (i) => {
    setDropdownArrowDeparture(
      dropdownArrowDeparture.map((entry, index) =>
        index === i ? (entry = !entry) : null
      )
    );
    console.log(dropdownArrowDeparture);
  };

  const handleSelectReturnFlight = (returnFlightID) => {
    console.log(returnFlightID);
    setSelectedReturnFlightID(returnFlightID);
  };

  const handleSubmit = () => {
    console.log(selectedDepartureFlightID);
    console.log(selectedReturnFlightID);
    if (selectedDepartureFlightID === "" || selectedReturnFlightID === "") {
      alert("Please select a departure flight and a return flight");
    } else {
      console.log("ekhtrna both");
    }
  };

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
    Axios.get(departureUrl).then((res) => {
      setDepartureList(res.data.flights);
      for (let index = 0; index < res.data.flights.length; index++) {
        setDropdownArrowDeparture([...dropdownArrowDeparture, false]);
      }
    });
    Axios.get(returnUrl).then((res) => setReturnList(res.data.flights));
  }, [departureUrl, returnUrl]); //might be flights

  return departureFlightList && returnFlightList ? (
    <div>
      <Container style={{ marginTop: "100px" }}>
        <Typography variant="h5">Choose your departure flight</Typography>
        <br />
        <br />
        {departureFlightList?.map((flight, i) => (
          <>
            <Button
              key={flight._id}
              variant="outlined"
              style={{ width: "50%", height: "100px", padding: "100px" }}
              className={props.cardAction}
              onClick={() => {
                handleSelectDepartureFlight(flight._id);
              }}
            >
              {moment(flight.departureDateTime).format("hh:mm A")} -{" "}
              {moment(flight.arrivalDateTime).format("hh:mm A")}
              <br />
              {flight.from} - {flight.to}
            </Button>
            <div
              style={{ display: "inline" }}
              onClick={() => handleDropdownClick(i)}
            >
              {dropdownArrowDeparture[i] ? (
                <>
                  <ArrowDropUpIcon
                    key={flight._id}
                    style={{ height: "35px", width: "35px", opacity: "50%" }}
                  />
                  {Object.entries(flight).map((entry) => {
                    let [key, value] = entry;
                    let result = key.replace(/([A-Z])/g, " $1");
                    let finalResult =
                      result.charAt(0).toUpperCase() + result.slice(1);

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
                              {key === "departureDateTime"
                                ? "Departing"
                                : "Arriving"}
                              : {moment(value).format("DD-MM-YYYY hh:mm A")}
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
                </>
              ) : (
                <ArrowDropDownIcon
                  style={{ height: "35px", width: "35px", opacity: "50%" }}
                />
              )}
            </div>
          </>
        ))}
      </Container>

      <Container style={{ marginTop: "100px" }}>
        <Typography variant="h5">Choose your return flight</Typography>
        <br />
        <br />
        {returnFlightList?.map((flight) => (
          <Button
            key={flight._id}
            variant="outlined"
            style={{ width: "50%", height: "100px", padding: "100px" }}
            className={props.cardAction}
            onClick={() => {
              handleSelectReturnFlight(flight._id);
            }}
          >
            {moment(flight.departureDateTime).format("hh:mm A")} -{" "}
            {moment(flight.arrivalDateTime).format("hh:mm A")}
            <br />
            {flight.from} - {flight.to}
          </Button>
        ))}
      </Container>
      <br />
      <Button variant="contained" onClick={handleSubmit}>
        Proceed
      </Button>
    </div>
  ) : null;
};

export default FlightList;
