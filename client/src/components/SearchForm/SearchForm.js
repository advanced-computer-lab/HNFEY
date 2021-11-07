import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const FlightForm = () => {
  const history = useHistory();
  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const noOfKeys = Object.keys(flightDetails).length;
    let search = "?";
    Object.entries(flightDetails).map((entry, i) => {
      let [key, value] = entry;
      let last = i + 1 === noOfKeys ? "" : "&";
      return (search += key + "=" + value + last);
    });
    try {
      history.push("/list-flights" + search);
    } catch (err) {
      console.log(err);
    }
  };
  const [flightDetails, setFlightDetails] = useState({});

  return (
    <Container component="main" align="center" style={{ marginTop: "65px" }}>
      <br />
      <Typography variant="h4" color="textSecondary">
        Search for a Flight
      </Typography>
      <br />
      <TextField
        style={{ width: 200 }}
        name="flightNumber"
        onChange={handleChange}
        variant="outlined"
        label="Flight Number"
        type="text"
      />

        <TextField
          style={{ width: 100 }}
          name="from"
          onChange={handleChange}
          variant="outlined"
          label="From"
          type="text"
        />
      
        <TextField
          style={{ width: 100 }}
          name="to"
          onChange={handleChange}
          variant="outlined"
          label="To"
          type="text"
        />

      <TextField
        style={{ width: 200 }}
        name="departureDateTime"
        onChange={handleChange}
        variant="outlined"
        label="Departure Date"
        InputLabelProps={{ shrink: true }}
        type="datetime-local"
      />

      <TextField
        style={{ width: 200 }}
        name="arrivalDateTime"
        onChange={handleChange}
        variant="outlined"
        label="Arrival Date"
        InputLabelProps={{ shrink: true }}
        type="datetime-local"
      />

      <TextField
        style={{ width: 200 }}
        onChange={handleChange}
        name="departureTerminal"
        variant="outlined"
        label="Departure Terminal"
        type="text"
      />
      <TextField
        style={{ width: 200 }}
        onChange={handleChange}
        name="arrivalTerminal"
        variant="outlined"
        label="Arrival Terminal"
        type="text"
      />

      <br />

      <Button
        style={{ width: 200, marginTop: "20px" }}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Search
      </Button>
    </Container>
  );
};

export default FlightForm;
