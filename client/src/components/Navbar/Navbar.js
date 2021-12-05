import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserContext } from "../../UserContext";

const Navbar = (props) => {
  const { typeOfUser, user } = useContext(UserContext);
  const history = useHistory();

  const handleAccountClick = () => {
    history.push("/user-profile", {
      ...props.location?.state,
      user,
    });
  };

  const handleClick = () => {
    history.push("/all-reservations", {
      ...props.location?.state,
      user,
    });
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        {typeOfUser === "guestUser" ? (
          <>
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
            <Button component={Link} to={`/`} color="secondary">
              Search
            </Button>
            <Button component={Link} to={`/login`} color="secondary">
              Login
            </Button>
          </>
        ) : typeOfUser === "admin" ? (
          <>
            <div style={{ flexGrow: 1 }}>
              <Typography
                component={Link}
                to="/admin"
                variant="h5"
                style={{ textDecoration: "none" }}
                color="primary"
              >
                HNFEY
              </Typography>
            </div>
            <Button component={Link} to={`/list-all-flights`} color="secondary">
              All Flights
            </Button>
            <Button component={Link} to={`/search`} color="secondary">
              Search Flights
            </Button>
            <Button component={Link} to={`/create-flight`} color="secondary">
              Add Flight
            </Button>
          </>
        ) : (
          <>
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
            <Button component={Link} to={`/`} color="secondary">
              Search
            </Button>
            <Button onClick={handleClick} color="secondary">
              Your reservations
            </Button>
            <AccountCircleIcon
              color="action"
              fontSize="large"
              onClick={handleAccountClick}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
