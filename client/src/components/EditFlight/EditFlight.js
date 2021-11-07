import { Button, TextField, Container, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { CircularProgress} from "@material-ui/core";

const EditFlight = () => {
  const { id } = useParams();
  const history = useHistory();
  const [flightDetails, setFlightDetails] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:8000/hnfey/flight/" + id).then((res) => {
      setFlightDetails(res.data.flight);
    });
  }, [id]);

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flight = { flight: flightDetails };
      Axios.put("http://localhost:8000/hnfey/flight/edit-flight", flight).then(
        () => history.push("/list-all-flights")
      );
    } catch (err) {
      console.log(err);
    }
  };

  return flightDetails?._id ? (
    <Container component="main" align="center">
      <br />

      <br />
      <Typography style={{ marginTop: "65px" }} variant="h4" color="textSecondary">
        Edit Flight
      </Typography>
      <br />
      <TextField
        style={{ width: 500 }}
        name="flightNumber"
        onChange={handleChange}
        value={flightDetails.flightNumber}
        variant="outlined"
        label="Flight Number"
        type="text"
      />
      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        name="departureDateTime"
        onChange={handleChange}
        value={flightDetails.departureDateTime}
        variant="outlined"
        label="Departure Time"
        type="text"
      />
      <br />
      <br />

      <TextField
        style={{ width: 500 }}
        name="arrivalDateTime"
        value={flightDetails.arrivalDateTime}
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
        value={flightDetails.departureTerminal}
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
        value={flightDetails.arrivalTerminal}
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
        value={flightDetails.baggageAllowance}
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
        value={flightDetails.numberOfBusinessSeats}
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
        value={flightDetails.numberOfEconomySeats}
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
        value={flightDetails.price}
        name="price"
        variant="outlined"
        label="Price"
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
        Edit
      </Button>
    </Container>
  ) : <CircularProgress />;
};

export default EditFlight;
