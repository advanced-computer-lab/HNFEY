import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import flight from "./images/flight.svg";
const Home = () => {
  return (
    <Container component="main" align="center">
      <Grid container alignItems="stretch" spacing={3}>
        <br />
        <br />
        <Grid item md={6}>
          <Typography
            variant="h2"
            color="primary"
            style={{ marginTop: "190px" }}
          >
            Welcome admin!
          </Typography>
          <Button
            component={Link}
            to={`/list-all-flights`}
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            All Flights
          </Button>
          <Button
            component={Link}
            to={`/search`}
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Search
          </Button>
          <Button
            component={Link}
            to={`/create-flight`}
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Add Flight
          </Button>
        </Grid>
        <Grid item md={6}>
          <img
            src={flight}
            alt=""
            style={{ height: 300, width: 300, marginTop: "80px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
