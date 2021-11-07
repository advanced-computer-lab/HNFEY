import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import Axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from 'moment';

export const CreateFlightForm = () => {
  const history = useHistory();
  const [departureValue, setDepartureValue] = React.useState(null);
  const [arrivalValue, setArrivalValue] = React.useState(null);

  const handleChange = (e) => {
    console.log(flightDetails);
    if (e.target.name === "numberOfEconomySeats") {
      setFlightDetails({
        ...flightDetails,
        [e.target.name]: e.target.value,
        numberOfAvailableEconomySeats: e.target.value,
      });
    } else if (e.target.name === "numberOfBusinessSeats") {
      setFlightDetails({
        ...flightDetails,
        [e.target.name]: e.target.value,
        numberOfAvailableBusinessSeats: e.target.value,
      });
    } else
      setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };

  const handleDepartureDateChange = (newValue) => {
    setDepartureValue(newValue);
    setFlightDetails({ ...flightDetails, departureDateTime: moment(newValue).format('YYYY-MM-DD hh:mm') });
  };

  const handleArrivalDateChange = (newValue) => {
    console.log(moment(newValue).format('YYYY-MM-DD hh:mm'));
    setArrivalValue(newValue);
    setFlightDetails({ ...flightDetails, arrivalDateTime: moment(newValue).format('YYYY-MM-DD hh:mm') });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const flight = {
      flight: flightDetails,
    };

    let url = "http://localhost:8000/hnfey/flight/create-flight";

    try {
      await Axios.post(url, flight);
      history.push("/list-all-flights");
    } catch (err) {
      console.log(err);
    }
  };
  const [flightDetails, setFlightDetails] = useState({});

  return (
    <Container component="main" align="center" style={{ marginTop: "65px" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <br />
        <Typography variant="h4" color="textSecondary">
          Add a Flight
        </Typography>
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
          name="from"
          onChange={handleChange}
          variant="outlined"
          label="From"
          type="text"
        />
        <br />
        <br />
        <TextField
          style={{ width: 500 }}
          name="to"
          onChange={handleChange}
          variant="outlined"
          label="To"
          type="text"
        />
        <br />
        <br />
        <DateTimePicker
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ width: 500 }}
              variant="outlined"
              label="Departure Date"
              name="departureDateTime"
              
            />
          )}
          value={departureValue}
          onChange={handleDepartureDateChange}
          // inputFormat="YYYY-MM-DD T:hh:mm:ss"
          inputFormat='yyyy/MM/dd HH:mm:ss'
        />
        <br />
        <br />
        <DateTimePicker
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ width: 500 }}
              variant="outlined"
              label="Arrival Date"
            />
          )}
          value={arrivalValue}
          name="arrivalDateTime"
          onChange={handleArrivalDateChange}
          // formatDate={(date) => moment(date).format('DD-MM-YYYY')}
          // inputFormat="YYYY-MM-DD T:hh:mm:ss"
          inputFormat='yyyy/MM/dd HH:mm:ss'



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
          type="number"
        />

        <br />
        <br />

        <TextField
          style={{ width: 500 }}
          onChange={handleChange}
          name="numberOfBusinessSeats"
          variant="outlined"
          label="Number of Business Seats"
          type="number"
        />

        <br />
        <br />

        <TextField
          style={{ width: 500 }}
          onChange={handleChange}
          name="baggageAllowance"
          variant="outlined"
          label="Baggage Allowance"
          type="number"
        />

        <br />
        <br />

        <TextField
          style={{ width: 500 }}
          onChange={handleChange}
          name="price"
          variant="outlined"
          label="Price"
          type="number"
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
      </LocalizationProvider>
    </Container>
  );
};
export default CreateFlightForm;
