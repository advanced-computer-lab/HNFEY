import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, TextField, Container, Typography } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from "moment";
import { createFlight } from "../../api/flight";

export const CreateFlightForm = () => {
  const [departureValue, setDepartureValue] = useState(null);
  const [arrivalValue, setArrivalValue] = useState(null);
  const [error, setError] = useState(false);
  const [flightDetails, setFlightDetails] = useState({});
  const [errorFromOrTo, setErrorFromOrTo] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.name === "from" || e.target.name === "to") {
      setErrorFromOrTo(() => false);
    }
    if (e.target.name === "flightNumber") {
      setError(() => false);
    }
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
    setFlightDetails({
      ...flightDetails,
      departureDateTime: moment(newValue).format("YYYY-MM-DD HH:mm"),
      departureDay: moment(newValue).format("YYYY-MM-DD"),
    });
  };

  const handleArrivalDateChange = (newValue) => {
    setArrivalValue(newValue);
    setFlightDetails({
      ...flightDetails,
      arrivalDateTime: moment(newValue).format("YYYY-MM-DD HH:mm"),
      arrivalDay: moment(newValue).format("YYYY-MM-DD"),
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (flightDetails.from === flightDetails.to) {
      setErrorFromOrTo(() => true);
      return;
    }

    delete flightDetails.seats;

    let url = "http://localhost:8000/hnfey/flight/create-flight";
    const seatsArray = [];

    let businessSeatsInRow = 6;

    for (
      let index = 1;
      index <= Math.ceil(Number(flightDetails.numberOfBusinessSeats) / 6);
      index++
    ) {
      if (
        index === Math.ceil(Number(flightDetails.numberOfBusinessSeats) / 6)
      ) {
        businessSeatsInRow =
          Number(flightDetails.numberOfBusinessSeats) % 6 === 0
            ? 6
            : Number(flightDetails.numberOfBusinessSeats) % 6;
      }
      for (let i = 1; i <= businessSeatsInRow; i++) {
        let seat = {
          seatNumber: "",
          reserved: false,
          class: "Business",
        };
        switch (i) {
          case 1:
            seat.seatNumber = "A" + index;
            break;
          case 2:
            seat.seatNumber = "B" + index;
            break;
          case 3:
            seat.seatNumber = "C" + index;
            break;
          case 4:
            seat.seatNumber = "D" + index;
            break;
          case 5:
            seat.seatNumber = "E" + index;
            break;
          case 6:
            seat.seatNumber = "F" + index;
            break;
          default:
            break;
        }
        seatsArray.push(seat);
      }
    }
    let economySeatsInRow = 10;
    let businessRows = Math.ceil(
      Number(flightDetails.numberOfBusinessSeats) / 6
    );
    for (
      let index = businessRows + 1;
      index <=
      Math.ceil(Number(flightDetails.numberOfEconomySeats) / 10) + businessRows;
      index++
    ) {
      if (
        index ===
        Math.ceil(Number(flightDetails.numberOfEconomySeats) / 6) + businessRows
      ) {
        economySeatsInRow = Number(flightDetails.numberOfEconomySeats) % 10;
      }
      for (let i = 1; i <= economySeatsInRow; i++) {
        let seat = {
          seatNumber: "",
          reserved: false,
          class: "Economy",
        };
        switch (i) {
          case 1:
            seat.seatNumber = "A" + index;
            break;
          case 2:
            seat.seatNumber = "B" + index;
            break;
          case 3:
            seat.seatNumber = "C" + index;
            break;
          case 4:
            seat.seatNumber = "D" + index;
            break;
          case 5:
            seat.seatNumber = "E" + index;
            break;
          case 6:
            seat.seatNumber = "F" + index;
            break;
          case 7:
            seat.seatNumber = "G" + index;
            break;
          case 8:
            seat.seatNumber = "H" + index;
            break;
          case 9:
            seat.seatNumber = "I" + index;
            break;
          case 10:
            seat.seatNumber = "J" + index;
            break;
          default:
            break;
        }
        seatsArray.push(seat);
      }
    }

    const flight = {
      flight: { ...flightDetails, seats: seatsArray },
    };
    try {
      createFlight(flight)
        .then(() => history.push("/list-all-flights"))
        .catch(() => setError(() => true));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container component="main" align="center" style={{ marginTop: "65px" }}>
      <form onSubmit={handleCreate}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <br />
          <Typography variant="h4" color="textSecondary">
            Add a Flight
          </Typography>
          <br />
          <TextField
            style={{ width: 500 }}
            name="flightNumber"
            error={error}
            helperText={error ? "Flight Number must be unique" : ""}
            onChange={handleChange}
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
            error={errorFromOrTo}
            onChange={handleChange}
            variant="outlined"
            label="From"
            type="text"
            required
          />
          <br />
          <br />
          <TextField
            style={{ width: 500 }}
            name="to"
            error={errorFromOrTo}
            helperText={
              errorFromOrTo
                ? "The departure and arrival cannot be the same"
                : ""
            }
            onChange={handleChange}
            variant="outlined"
            label="To"
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
            minDateTime={new Date()}
            value={departureValue}
            onChange={handleDepartureDateChange}
            // inputFormat="YYYY-MM-DD T:hh:mm:ss"
            inputFormat="yyyy/MM/dd HH:mm"
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
            value={arrivalValue}
            name="arrivalDateTime"
            onChange={handleArrivalDateChange}
            minDateTime={new Date(departureValue)}
            inputFormat="yyyy/MM/dd HH:mm"
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
            required
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
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            onChange={handleChange}
            name="numberOfEconomySeats"
            InputProps={{ inputProps: { min: 40, max: 200, step: 1 } }}
            variant="outlined"
            label="Number of Economy Seats"
            type="number"
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            onChange={handleChange}
            name="numberOfBusinessSeats"
            InputProps={{
              inputProps: {
                max:
                  260 -
                  (!flightDetails.numberOfEconomySeats
                    ? 0
                    : flightDetails.numberOfEconomySeats),
                step: 1,
              },
            }}
            variant="outlined"
            label="Number of Business Seats"
            type="number"
            required
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
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            onChange={handleChange}
            name="economyPrice"
            variant="outlined"
            label="Economy Price"
            type="number"
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            onChange={handleChange}
            name="businessPrice"
            variant="outlined"
            label="Business Price"
            type="number"
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
            Create
          </Button>
        </LocalizationProvider>
      </form>
    </Container>
  );
};
export default CreateFlightForm;
