import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography, Grid, Paper } from "@material-ui/core";

export const AllReservations = () => {
  const [user, setUser] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const history = useHistory();
  const location = useLocation();
  let url = "http://localhost:8000/hnfey/user/find-user?";

  let query = queryString.parse(location.search);
  const noOfKeys = Object.keys(query).length;
  Object.entries(query).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (url += key + "=" + value + last);
  });

  useEffect(() => {
    let url2 = "http://localhost:8000/hnfey/reservation/find-reservation?";
    const fetchData = async () => {
      await Axios.get(url).then((res) => {
        setUser(() => res.data.user);
        const userIDQuery = "userId=" + res.data.user._id;
        url2 += userIDQuery;
      });

      await Axios.get(url2).then((res) => {
        setUserReservations(() => res.data.reservation);
      });
    };
    fetchData();
  }, [url]);

  const handleViewReservation = async (e, reservation) => {
    e.preventDefault();
    history.push({
      pathname: "/reservation",
      state: { userReservation: reservation, user: user },
    });
  };

  return user._id
    ? userReservations.map((reservation) => {
        return (
          <React.Fragment key={reservation._id}>
            <Container component="main" style={{ marginTop: "2%" }}>
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
                      Reservation Number
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
                    onClick={(e) => handleViewReservation(e, reservation)}
                  >
                    View Reservation
                  </Button>
                </div>
              </Paper>
            </Container>
          </React.Fragment>
        );
      })
    : null;
};

export default AllReservations;
