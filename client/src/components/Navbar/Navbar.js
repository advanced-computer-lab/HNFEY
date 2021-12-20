import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserContext } from "../../UserContext";

const Navbar = (props) => {
  const [userLS, setUserLS] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const typeOfUserLS = userLS?.uType;
  const { typeOfUser, user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleAccountClick = () => {
    history.push("/user-profile", {
      ...props.location?.state,
      user: user.user,
    });
  };

  const handleClick = () => {
    history.push("/all-reservations", {
      ...props.location?.state,
      user: user.user,
    });
  };

  const handleLogout = () => {
    history.push("/login");
    localStorage.clear();
    setUserLS(null);
    setUser(null);
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        {typeOfUser !== "admin" &&
        typeOfUserLS !== "admin" &&
        typeOfUser !== "user" &&
        typeOfUserLS !== "user" ? (
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
        ) : typeOfUser === "admin" || typeOfUserLS === "admin" ? (
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
            <Button onClick={handleLogout} color="secondary">
              Logout
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
            <Button onClick={handleLogout} color="secondary">
              Logout
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
