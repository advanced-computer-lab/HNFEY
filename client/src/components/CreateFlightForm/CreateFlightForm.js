import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import Axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from "moment";

export const CreateFlightForm = () => {
  const history = useHistory();
  const [departureValue, setDepartureValue] = useState(null);
  const [arrivalValue, setArrivalValue] = useState(null);
  const [flightDetails, setFlightDetails] = useState({});

  const handleChange = (e) => {
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
      departureDateTime: moment(newValue).format("YYYY-MM-DD hh:mm"),
      departureDay: moment(newValue).format("YYYY-MM-DD"),
    });
  };

  const handleArrivalDateChange = (newValue) => {
    setArrivalValue(newValue);
    setFlightDetails({
      ...flightDetails,
      arrivalDateTime: moment(newValue).format("YYYY-MM-DD hh:mm"),
      arrivalDay: moment(newValue).format("YYYY-MM-DD"),
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const numberOfSeats =
      Number(flightDetails.numberOfBusinessSeats) +
      Number(flightDetails.numberOfEconomySeats);
    console.log(numberOfSeats);
    delete flightDetails.seats;
    const flight = {
      flight: flightDetails,
    };

    let url = "http://localhost:8000/hnfey/flight/create-flight";
    let seatsUrl = "http://localhost:8000/hnfey/seat/bulk-create";
    let flightSeatsUrl = "http://localhost:8000/hnfey/flight/edit-flight";
    const seatsArray = [];
    let flightId;
    try {
      await Axios.post(url, flight).then((res) => {
        flightId = res.data.flight._id;
        for (let index = 0; index < numberOfSeats; index++) {
          let seat = {
            flightId: flightId,
            seatNumber: "",
            reserved: false,
            class: "",
          };
          if (index < flightDetails.numberOfBusinessSeats) {
            seat.class = "Business";
          } else {
            seat.class = "Economy";
          }
          switch (Math.floor(index / 10)) {
            case 0:
              seat.seatNumber = "A" + (index % 10);
              break;
            case 1:
              seat.seatNumber = "B" + (index % 10);
              break;
            case 2:
              seat.seatNumber = "C" + (index % 10);
              break;
            case 3:
              seat.seatNumber = "D" + (index % 10);
              break;
            case 4:
              seat.seatNumber = "E" + (index % 10);
              break;
            case 5:
              seat.seatNumber = "F" + (index % 10);
              break;
            case 6:
              seat.seatNumber = "G" + (index % 10);
              break;
            case 7:
              seat.seatNumber = "H" + (index % 10);
              break;
            case 8:
              seat.seatNumber = "I" + (index % 10);
              break;
            case 9:
              seat.seatNumber = "J" + (index % 10);
              break;
            case 10:
              seat.seatNumber = "K" + (index % 10);
              break;
            case 11:
              seat.seatNumber = "L" + (index % 10);
              break;
            case 12:
              seat.seatNumber = "M" + (index % 10);
              break;
            case 13:
              seat.seatNumber = "N" + (index % 10);
              break;
            case 14:
              seat.seatNumber = "O" + (index % 10);
              break;
            case 15:
              seat.seatNumber = "P" + (index % 10);
              break;
            case 16:
              seat.seatNumber = "Q" + (index % 10);
              break;
            case 17:
              seat.seatNumber = "R" + (index % 10);
              break;
            case 18:
              seat.seatNumber = "S" + (index % 10);
              break;
            case 19:
              seat.seatNumber = "T" + (index % 10);
              break;
            case 20:
              seat.seatNumber = "U" + (index % 10);
              break;
            case 21:
              seat.seatNumber = "V" + (index % 10);
              break;
            case 22:
              seat.seatNumber = "W" + (index % 10);
              break;
            case 23:
              seat.seatNumber = "X" + (index % 10);
              break;
            case 24:
              seat.seatNumber = "Y" + (index % 10);
              break;
            case 25:
              seat.seatNumber = "Z" + (index % 10);
              break;
            default:
              break;
          }
          seatsArray.push(seat);
        }
        // console.log(seatsArray);
      });
      const seats = {
        seats: seatsArray,
      };
      const seatsId = [];
      await Axios.post(seatsUrl, seats).then((res) => {
        res.data.seats.map((seat) => {
          seatsId.push(seat._id);
        });
      });

      const flightSeats = {
        flight: { ...flightDetails, seats: seatsId },
      };
      console.log(flightSeats);
      await Axios.put(flightSeatsUrl, flightSeats).then((res) => {
        console.log(res.data);
      });

      // history.push("/list-all-flights");
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
            value={departureValue}
            onChange={handleDepartureDateChange}
            // inputFormat="YYYY-MM-DD T:hh:mm:ss"
            inputFormat="yyyy/MM/dd HH:mm:ss"
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
            // formatDate={(date) => moment(date).format('DD-MM-YYYY')}
            // inputFormat="YYYY-MM-DD T:hh:mm:ss"
            inputFormat="yyyy/MM/dd HH:mm:ss"
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
            InputProps={{ inputProps: { max: 200, step: 1 } }}
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
