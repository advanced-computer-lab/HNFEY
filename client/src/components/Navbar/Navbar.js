import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

const Navbar = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            style={{ textDecoration: "none" }}
            color="primary"
          >
            HNFEY
          </Typography>
        </div>
        <Button
          component={Link}
          to={`/list-all-flights`}
          // variant="contained"
          color="secondary"
        >
          All Flights
        </Button>
        <Button
          component={Link}
          to={`/search`}
          // variant="contained"
          color="secondary"
        >
          Search
        </Button>
        <Button
          component={Link}
          to={`/create-flight`}
          // variant="contained"
          color="secondary"
        >
          Add Flight
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
