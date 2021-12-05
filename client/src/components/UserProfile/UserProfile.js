import React, { useContext } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Container, Button, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { CircularProgress } from "@material-ui/core";

const UserProfile = (props) => {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const handleEdit = () => {
    history.push("/edit-user", {
      ...props.location.state,
      user,
    });
  };
  const handleViewReservation = () => {
    history.push("/all-reservations", {
      ...props.location.state,
      user,
    });
  };

  useEffect(() => {
    if (props.location?.state?.user) {
      setUser(() => props.location.state.user);
    } else {
      history.push("/login");
    }
  }, [history, props.location.state.user, setUser, user?._id]);

  return user?._id ? (
    <Container component="main" align="center" style={{ marginTop: "65px" }}>
      <AccountCircleIcon style={{ fontSize: "150", marginTop: "20px" }} />
      <Typography variant="h4" style={{ fontSize: "2rem", fontWeight: 500 }}>
        {user.firstName} {user.lastName}
      </Typography>
      <div style={{ margin: "1rem 0rem" }}>
        <Typography variant="h4" style={{ fontSize: "1rem", fontWeight: 300 }}>
          {user.email}
        </Typography>
      </div>
      <Button variant="outlined" style={{ width: "40%" }} onClick={handleEdit}>
        Edit
      </Button>
      <br />
      <br />
      <Button
        variant="outlined"
        style={{ width: "40%" }}
        onClick={handleViewReservation}
      >
        View Reservations
      </Button>
    </Container>
  ) : (
    <Container component="main">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    </Container>
  );
};

export default UserProfile;
