import { Button, TextField, Container, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";

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

  const handleDepartureDateChange = (newValue) => {
    setFlightDetails({
      ...flightDetails,
      departureDateTime: moment(newValue).format("YYYY-MM-DD hh:mm"),
      departureDay: moment(newValue).format("YYYY-MM-DD"),
    });
  };

  const handleArrivalDateChange = (newValue) => {
    setFlightDetails({
      ...flightDetails,
      arrivalDateTime: moment(newValue).format("YYYY-MM-DD hh:mm"),
      arrivalDay: moment(newValue).format("YYYY-MM-DD"),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flight = { flight: flightDetails };
      Axios.put("http://localhost:8000/hnfey/flight/edit-flight", flight).then(
        (res) => {
          console.log(res.data);
          history.push("/list-all-flights");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return flightDetails?._id ? (
    <Container component="main" align="center">
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Typography
            style={{ marginTop: "65px" }}
            variant="h4"
            color="textSecondary"
          >
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
            required
          />
          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            name="from"
            onChange={handleChange}
            variant="outlined"
            label="From"
            value={flightDetails.from}
            type="text"
            required
          />
          <br />
          <br />
          <TextField
            style={{ width: 500 }}
            name="to"
            onChange={handleChange}
            variant="outlined"
            label="To"
            value={flightDetails.to}
            type="text"
            required
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
                required
              />
            )}
            value={flightDetails.departureDateTime}
            onChange={handleDepartureDateChange}

            // inputFormat='yyyy/MM/dd HH:mm:ss'
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
                required
              />
            )}
            value={flightDetails.arrivalDateTime}
            name="arrivalDateTime"
            onChange={handleArrivalDateChange}
            // formatDate={(date) => moment(date).format('DD-MM-YYYY')}
            // inputFormat="YYYY-MM-DD T:hh:mm:ss"
            // inputFormat='yyyy/MM/dd HH:mm:ss'
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
            required
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
            required
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
            required
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
            required
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
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            onChange={handleChange}
            value={flightDetails.economyPrice}
            name="economyPrice"
            variant="outlined"
            label="Economy Price"
            type="text"
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            onChange={handleChange}
            value={flightDetails.businessPrice}
            name="businessPrice"
            variant="outlined"
            label="Business Price"
            type="text"
            required
          />

          <br />
          <br />

          <Button
            type="submit"
            style={{ width: 500 }}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </LocalizationProvider>
      </form>
    </Container>
  ) : (
    <CircularProgress />
  );
};

export default EditFlight;
