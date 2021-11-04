import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import Axios from "axios";

const FlightForm = () => {
  const history = useHistory();
  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const flight = {
      flight: flightDetails,
    };
    console.log(flightDetails);

    let url = "http://localhost:8000/hnfey/flight/find-flight";

    try {
      await Axios.post(url, flight);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  const [flightDetails, setFlightDetails] = useState({});

  return (
    <>
      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        name="flightNumber"
        onChange={handleChange}
        variant="outlined"
        label="Flight Number"
        type="text"
      />
      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        name="departureTimeDate"
        onChange={handleChange}
        variant="outlined"
        label="Departure Time"
        type="text"
      />
      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        name="arrivalTimeDate"
        onChange={handleChange}
        variant="outlined"
        label="Arrival Time"
        type="text"
      />

      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        onChange={handleChange}
        name="arrivalTerminal"
        variant="outlined"
        label="Arrival Terminal"
        type="text"
      />

      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        onChange={handleChange}
        name="departureTerminal"
        variant="outlined"
        label="Departure Terminal"
        type="text"
      />
      <br />
      <br />

      <Button
        style={{ width: 500 }}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Search
      </Button>
    </>
  );
};

export default FlightForm;
