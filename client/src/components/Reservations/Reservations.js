import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography, Grid, Paper } from "@material-ui/core";

export const Reservations = () => {
  const [user, setUser] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const history = useHistory();
  const location = useLocation();
  let url = "http://localhost:8000/hnfey/user/find-user?";
  let url2 = "http://localhost:8000/hnfey/reservation/find-reservation?";
  let query = queryString.parse(location.search);
  const noOfKeys = Object.keys(query).length;
  Object.entries(query).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (url += key + "=" + value + last);
  });

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get(url).then((res) => {
        setUser(() => res.data.user);
        const userIDQuery = "userId=" + res.data.user._id;
        url2 += userIDQuery;
      });

      await Axios.get(url2).then((res) => {
        setUserReservations(() => res.data.reservation);
        // const flightIDQuery =
        //   "_id=" + res.data.reservation[0].departingFlightId;
        // url3 += flightIDQuery;

        // const flightIDQuery1 =
        //   "_id=" + res.data.reservation[0].arrvivalFlightId;
        // url4 += flightIDQuery1;

        // if (res.data.reservation[0].status === "Reserved")
        //   setCancelPressed(false);
        // } else {
        //   setCancelPressed(true);
        // }
      });
    };
    fetchData();
  }, []);
  const handleViewReservation = async (e, reservation) => {
    e.preventDefault();
    history.push({
      pathname: "/user-reservations",
      state: { userReservation: reservation },
    });
  };

  return user._id
    ? userReservations.map((reservation) => {
        return (
          <>
            <Container component="main" style={{ marginTop: "2%" }}>
              {/* <Typography
                variant="h4"
                style={{ fontWeight: 600, color: "#666" }}
              >
                Your Reservations
              </Typography> */}
              <br />
              <Paper elevation={6} style={{ margin: "5% 0% 2%" }}>
                <Grid
                  container
                  spacing={3}
                  style={{ margin: "0% 4%", marginTop: "5%" }}
                >
                  <Grid item md={6}>
                    <Typography
                      variant="h2"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 500,
                        margin: "5% 0% 1% 2%",
                      }}
                    >
                      Reservation Numeber
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        margin: "1% 0% 7% 2%",
                      }}
                    >
                      {reservation._id}
                    </Typography>

                    <Typography
                      variant="body1"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        margin: "1% 0% 3% 2%",
                      }}
                    >
                      Fare: {reservation.class}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        margin: "12% 0% 1% 15%",
                      }}
                    >
                      x{reservation.numberOfPassengers} passengers
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        margin: "1% 0% 1% 15%",
                      }}
                    >
                      Reservation {reservation.status}
                    </Typography>
                  </Grid>
                  {/* <div key={reservation._id}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={3}
                    style={{ margin: "0% 4%", marginTop: "5%" }}
                  >
                    <Grid item md={3}>
                      <Typography variant="h6" style={{ marginBottom: "2%" }}>
                        Reservation Number {reservation._id}
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "2%" }}
                      >
                        {reservation.numberOfPassengers}
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "2%" }}
                      >
                        {reservation.class}
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "2%" }}
                      >
                        {reservation.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </div> */}
                </Grid>
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
                    style={{ marginBottom: "2%", fontSize: "1.1rem" }}
                    // onClick={handleViewReservation(reservation)}
                    onClick={(e) => handleViewReservation(e, reservation)}
                  >
                    View Reservation
                  </Button>
                </div>
              </Paper>
            </Container>
          </>
        );
      })
    : null;
};

export default Reservations;
