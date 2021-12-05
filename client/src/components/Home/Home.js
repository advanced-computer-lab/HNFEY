import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { useHistory } from "react-router";
import moment from "moment";

const FlightForm = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("Economy");
  const [flightDetails, setFlightDetails] = useState({ class: "Economy" });

  const handleChange = (e) => {
    if (e.target.name === "from" || e.target.name === "to") {
      setError(() => false);
    }
    if (e.target.name === "class") {
      setSelected(e.target.value);
    }
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (flightDetails.from !== flightDetails.to) {
      const noOfKeys = Object.keys(flightDetails).length;
      let search = "?";
      Object.entries(flightDetails).map((entry, i) => {
        let [key, value] = entry;
        let last = i + 1 === noOfKeys ? "" : "&";
        return (search += key + "=" + value + last);
      });
      try {
        history.push("/flights-results-guest" + search);
      } catch (err) {
        console.log(err);
      }
    } else {
      setError(() => true);
    }
  };

  return (
    <Container component="main" align="center" style={{ marginTop: "65px" }}>
      <form onSubmit={handleSubmit}>
        <br />
        <Typography variant="h4" color="textSecondary">
          Search for a Flight
        </Typography>
        <br />
        <br />

        {/* <FormControl style={{ width: 95, margin: "0px 5px 10px 0px" }}>
          <InputLabel
            id="demo-simple-select-label"
            style={{
              position: "absolute",
              textIndent: 15,
              bottom: 10,
            }}
            required
          >
            From
          </InputLabel>
          <Select
            style={{ width: 95, margin: "0px 5px 10px 0px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="From"
            name="from"
            value={selected}
            variant="outlined"
            onChange={handleChange}
            // defaultValue="Economy"
          >
            {airports.map((airport) => {
              <MenuItem value={airport.code}></MenuItem>
            })}
            <MenuItem value={"Economy"}>Economy</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
          </Select>
        </FormControl> */}

        <TextField
          style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}
          name="from"
          error={error}
          onChange={handleChange}
          variant="outlined"
          label="From"
          type="text"
          required
        />

        <TextField
          style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}
          name="to"
          error={error}
          helperText={
            error ? "The departure and arrival cannot be the same" : ""
          }
          onChange={handleChange}
          variant="outlined"
          label="To"
          type="text"
          required
        />

        <TextField
          style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}
          name="departureDay"
          onChange={handleChange}
          variant="outlined"
          label="Departure Date"
          InputProps={{ inputProps: { min: moment().format("YYYY-MM-DD") } }}
          InputLabelProps={{ shrink: true }}
          type="date"
          required
        />

        <TextField
          style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}
          name="returnDate"
          onChange={handleChange}
          variant="outlined"
          label="Return Date"
          InputProps={{
            inputProps: {
              min: moment(flightDetails.departureDay).format("YYYY-MM-DD"),
            },
          }}
          InputLabelProps={{ shrink: true }}
          type="date"
          required
        />

        <FormControl style={{ maxWidth: 200, margin: "0px 5px 10px 0px" }}>
          <InputLabel
            id="demo-simple-select-label"
            style={{
              position: "absolute",
              textIndent: 15,
              bottom: 10,
            }}
            required
          >
            Class
          </InputLabel>
          <Select
            style={{ minWidth: 160, maxWidth: 200, margin: "0px 5px 10px 0px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Class"
            name="class"
            value={selected}
            variant="outlined"
            onChange={handleChange}
          >
            <MenuItem value={"Economy"}>Economy</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
          </Select>
        </FormControl>

        <TextField
          style={{ minWidth: 180, maxWidth: 200, margin: "0px 5px 10px 0px" }}
          onChange={handleChange}
          name="passengers"
          variant="outlined"
          label="Passengers"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 9 } }}
          required
        />

        <br />

        <Button
          style={{ maxWidth: 200, marginTop: "20px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </form>
    </Container>
  );
};

export default FlightForm;
