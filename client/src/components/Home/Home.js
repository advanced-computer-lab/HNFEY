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

const FlightForm = () => {
  const history = useHistory();
  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
    // console.log(e.target.name);
    // console.log(e.target.value);
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
      history.push("/flights-results-guest" + search);
    } catch (err) {
      console.log(err);
    }
  };
  const [flightDetails, setFlightDetails] = useState({});

  return (
    <Container component="main" align="center" style={{ marginTop: "65px" }}>
      <form onSubmit={handleSubmit}>
        <br />
        <Typography variant="h4" color="textSecondary">
          Search for a Flight
        </Typography>
        <br />
        <br />

        <TextField
          style={{ width: 95, margin: "0px 5px 10px 0px" }}
          name="from"
          onChange={handleChange}
          variant="outlined"
          label="From"
          type="text"
          required
        />

        <TextField
          style={{ width: 95, margin: "0px 5px 10px 0px" }}
          name="to"
          onChange={handleChange}
          variant="outlined"
          label="To"
          type="text"
          required
        />

        <TextField
          style={{ width: 200, margin: "0px 5px 10px 0px" }}
          name="departureDay"
          onChange={handleChange}
          variant="outlined"
          label="Departure Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          required
        />

        <TextField
          style={{ width: 200, margin: "0px 5px 10px 0px" }}
          name="arrivalDay"
          onChange={handleChange}
          variant="outlined"
          label="Arrival Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          required
        />

        <FormControl style={{ width: 200, margin: "0px 5px 10px 0px" }}>
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
            style={{ width: 200, margin: "0px 5px 10px 0px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Class"
            name="class"
            variant="outlined"
            onChange={handleChange}
            // defaultValue="Economy"
          >
            <MenuItem value={"Economy"}>Economy</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
          </Select>
        </FormControl>

        <TextField
          style={{ width: 200, margin: "0px 5px 10px 0px" }}
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
          style={{ width: 200, marginTop: "20px" }}
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
