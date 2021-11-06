import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import Axios from "axios";

export const CreateFlightForm = () => {

    const history = useHistory();

    const handleChange = (e) => {
        setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };
  const handleCreate = async (e) => {

    e.preventDefault();

    const flight = {
      flight: flightDetails,
    };

    console.log(flightDetails);

    let url = "http://localhost:8000/hnfey/flight/create-flight";

    try {
      await Axios.post(url, flight);
      history.push("/list-all-flights");
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
        name="departureTime"
        onChange={handleChange}
        variant="outlined"
        label="Departure Time"
        type="date"
      />
      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        name="arrivalTime"
        onChange={handleChange}
        variant="outlined"
        label="Arrival Time"
        type="date"
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
        name="numberOfEconomySeats"
        variant="outlined"
        label="Number of Economy Seats"
        type="text"
      />

      <br />
      <br />

    <TextField
        style={{ width: 500 }}
        onChange={handleChange}
        name="numberOfBusinessSeats"
        variant="outlined"
        label="Number of Business Seats"
        type="text"
      />

      <br />
      <br />

    <TextField
        style={{ width: 500 }}
        onChange={handleChange}
        name="baggageAllowance"
        variant="outlined"
        label="Baggage Allowance"
        type="text"
      />

      <br />
      <br />

    <TextField
        style={{ width: 500 }}
        onChange={handleChange}
        name="price"
        variant="outlined"
        label="Price"
        type="text"
      />

      <br />
      <br />

      <Button
        style={{ width: 500 }}
        onClick={handleCreate}
        variant="contained"
        color="primary"
      >
        Create
      </Button>
    </>
    )
}
export default CreateFlightForm;