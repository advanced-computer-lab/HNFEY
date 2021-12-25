import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography, Grid, Paper, Tooltip } from "@material-ui/core";
import { findAllReservations } from "../../api/reservation";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PersonIcon from "@mui/icons-material/Person";

export const AllReservations = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).user
  );
  const [userReservations, setUserReservations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      findAllReservations(user._id).then((res) => {
        setUserReservations(() => res.data.reservation);
      });
    };
    fetchData();
  }, [props.location?.state?.user, setUser]);

  const handleViewReservation = async (e, reservation) => {
    e.preventDefault();
    history.push("/reservation", {
      userReservation: reservation,
      user,
    });
  };

  return user._id ? (
    <Container component="main" style={{ marginTop: "2%" }}>
      <Typography
        variant="h1"
        style={{
          fontSize: "1.8rem",
          fontWeight: 500,
          margin: "10% 0% 0% 0%",
          color: "#696969",
        }}
      >
        Current Reservations
      </Typography>
      {userReservations.map((reservation) => {
        return reservation.status === "Reserved" ? (
          <React.Fragment key={reservation._id}>
            <br />
            <Paper
              elevation={6}
              style={{ margin: "0% 0% 2%", borderRadius: "15px" }}
            >
              <Grid
                container
                spacing={3}
                style={{ margin: "0% 4%", marginTop: "2%" }}
              >
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "3%",
                      marginTop: "3%",
                    }}
                  >
                    <Tooltip title="Reservation">
                      <ConfirmationNumberIcon
                        fontSize="large"
                        style={{ marginRight: "2%" }}
                      />
                    </Tooltip>
                    <Typography variant="h5">
                      Reservation #{reservation.index}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "3%",
                      marginTop: "3%",
                      marginLeft: "5%",
                    }}
                  >
                    <Tooltip title="Reservation">
                      <PersonIcon
                        fontSize="medium"
                        style={{ marginRight: "1%" }}
                      />
                    </Tooltip>
                    <Typography variant="h6" style={{ fontSize: "medium" }}>
                      x{reservation.passengers.length} passengers
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "3%",
                      marginTop: "3%",
                      marginLeft: "5%",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "medium" }}>
                      {reservation.class} Class
                    </Typography>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "2%",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginBottom: "2%",
                        fontSize: "1.1rem",
                        marginTop: "10%",
                      }}
                      onClick={(e) => handleViewReservation(e, reservation)}
                    >
                      View Reservation
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            {/* </Container> */}
          </React.Fragment>
        ) : (
          ""
        );
      })}
      <Typography
        variant="h1"
        style={{
          fontSize: "1.8rem",
          fontWeight: 500,
          margin: "10% 0% 0% 0%",
          color: "#696969",
        }}
      >
        Cancelled Reservations
      </Typography>
      {userReservations.map((reservation) => {
        return reservation.status === "Cancelled" ? (
          <React.Fragment key={reservation._id}>
            <br />
            <Paper
              elevation={6}
              style={{ margin: "0% 0% 2%", borderRadius: "15px" }}
            >
              <Grid
                container
                spacing={3}
                style={{ margin: "0% 4%", marginTop: "2%" }}
              >
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "3%",
                      marginTop: "3%",
                    }}
                  >
                    <Tooltip title="Reservation">
                      <ConfirmationNumberIcon
                        fontSize="large"
                        style={{ marginRight: "2%" }}
                      />
                    </Tooltip>
                    <Typography variant="h5">
                      Reservation #{reservation.index}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "3%",
                      marginTop: "3%",
                      marginLeft: "5%",
                    }}
                  >
                    <Tooltip title="Reservation">
                      <PersonIcon
                        fontSize="medium"
                        style={{ marginRight: "1%" }}
                      />
                    </Tooltip>
                    <Typography variant="h6" style={{ fontSize: "medium" }}>
                      x{reservation.passengers.length} passengers
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "3%",
                      marginTop: "3%",
                      marginLeft: "5%",
                    }}
                  >
                    <Typography variant="h6" style={{ fontSize: "medium" }}>
                      {reservation.class} Class
                    </Typography>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "2%",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginBottom: "2%",
                        fontSize: "1.1rem",
                        marginTop: "10%",
                      }}
                      onClick={(e) => handleViewReservation(e, reservation)}
                    >
                      View Reservation
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            {/* </Container> */}
          </React.Fragment>
        ) : (
          ""
        );
      })}
    </Container>
  ) : null;
};

export default AllReservations;
