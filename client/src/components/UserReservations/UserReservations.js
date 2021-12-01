import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { Container, Button } from "@material-ui/core";
import Axios from "axios";
import {
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Table,
} from "@material-ui/core";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import moment from "moment";

const UserReservations = (props) => {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [userReservations, setUserReservations] = useState({});
  const [departingFlight, setDepartingFlight] = useState({});
  const [arrivalFlight, setArrivalFlight] = useState({});
  const [cancelPressed, setCancelPressed] = useState("");
  const location = useLocation();
  // let url = "http://localhost:8000/hnfey/user/find-user?";
  // let url2 = "http://localhost:8000/hnfey/reservation/find-reservation?";
  let url3 = "http://localhost:8000/hnfey/flight/list-flights?";
  let url4 = "http://localhost:8000/hnfey/flight/list-flights?";
  const [mounted, setMounted] = useState(false);
  // let query = queryString.parse(location.search);
  // const noOfKeys = Object.keys(query).length;
  // Object.entries(query).map((entry, i) => {
  //   let [key, value] = entry;
  //   let last = i + 1 === noOfKeys ? "" : "&";
  //   return (url += key + "=" + value + last);
  // });

  console.log(userReservations);
  console.log(departingFlight);
  console.log(arrivalFlight);
  useEffect(() => {
    //setUserReservations(location.state.userReservation);

    setUserReservations(() => props.location.state.userReservation);
    setMounted(() => true);

    // console.log(userReservations);
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log("hi bro");
      const fetchData = async () => {
        {
          console.log(userReservations.departingFlightId);
          const flightIDQuery = "_id=" + userReservations.departingFlightId;
          url3 += flightIDQuery;

          const flightIDQuery1 = "_id=" + userReservations.arrvivalFlightId;
          url4 += flightIDQuery1;
          if (userReservations.status === "Reserved") {
            setCancelPressed(false);
          } else {
            setCancelPressed(true);
          }
        }
        // await Axios.get(url).then((res) => {
        //   setUser(() => res.data.user);
        //   const userIDQuery = "userId=" + res.data.user._id;
        //   url2 += userIDQuery;
        // });
        // console.log(location.state.userReservation);

        // await Axios.get(url2).then((res) => {
        //   setUserReservations(() => res.data.reservation);
        //   const flightIDQuery = "_id=" + userReservations.departingFlightId;
        //   url3 += flightIDQuery;

        //   const flightIDQuery1 =
        //     "_id=" + res.data.reservation[0].arrvivalFlightId;
        //   url4 += flightIDQuery1;
        // });

        await Axios.get(url3).then((res) => {
          // res.data.flights.map((flight) => {
          //   setDepartingFlight({
          //   departingFlight,flight,
          //   });
          // });
          // console.log(res.data.flights);
          setDepartingFlight(() => res.data.flights[0]);
          //console.log(departingFlight);
        });
        await Axios.get(url4).then((res) => {
          // res.data.flights.map((flight) => {
          //   setArrivalFlight({ ...arrivalFlight, ["id" + flight._id]: flight });
          // });
          setArrivalFlight(() => res.data.flights[0]);
        });
      };
      fetchData();
    }
  }, [userReservations]);

  const handleCancel = async (e, reservationId) => {
    e.preventDefault();

    const reservation = {
      reservation: { _id: reservationId, status: "Cancelled" },
    };
    await Axios.put(
      "http://localhost:8000/hnfey/reservation/edit-reservation",
      reservation
    ).then((res) => {
      console.log(res.data);
      setCancelPressed(true);
      console.log(cancelPressed);
    });
  };
  // console.log(userReservations);
  return userReservations._id && departingFlight._id && arrivalFlight._id ? (
    <div>
      <h1>My reservations</h1>

      {/* {userReservations.map((reservation) => {
        {
          const concat = "id" + userReservations.departingFlightId;
          const concat2 = "id" + userReservations.arrvivalFlightId;
          console.log(arrivalFlight[concat2]);
          if (departingFlight[concat] && arrivalFlight[concat2]) {
            return (
              <> */}
      <TableContainer component={Paper} style={{ marginTop: "65px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Flight Number</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Departure Time</TableCell>
              <TableCell align="center">Arrival Time</TableCell>
              <TableCell align="center">Departure Terminal</TableCell>
              <TableCell align="center">Arrival Terminal</TableCell>
              <TableCell align="center">Number of Passengers</TableCell>
              {/* <TableCell align="center">Cancel</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              <TableRow key={departingFlight._id}>
                <TableCell
                  // onClick={() => handleCellClick(flight._id)}
                  component="th"
                  scope="row"
                >
                  {departingFlight.flightNumber}
                </TableCell>
                <TableCell align="center">{departingFlight.from}</TableCell>
                <TableCell align="center">{departingFlight.to}</TableCell>
                <TableCell align="center">
                  {moment(departingFlight.departureDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {moment(departingFlight.arrivalDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {departingFlight.departureTerminal}
                </TableCell>
                <TableCell align="center">
                  {departingFlight.arrivalTerminal}
                </TableCell>
                <TableCell align="center">
                  {userReservations.numberOfPassengers}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>

              <TableRow key={arrivalFlight._id}>
                <TableCell
                  // onClick={() => handleCellClick(flight._id)}
                  component="th"
                  scope="row"
                >
                  {arrivalFlight.flightNumber}
                </TableCell>
                {console.log(arrivalFlight.from)}
                <TableCell align="center">{arrivalFlight.from}</TableCell>
                <TableCell align="center">{arrivalFlight.to}</TableCell>
                <TableCell align="center">
                  {moment(arrivalFlight.departureDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {moment(arrivalFlight.arrivalDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {arrivalFlight.departureTerminal}
                </TableCell>
                <TableCell align="center">
                  {arrivalFlight.arrivalTerminal}
                </TableCell>
                <TableCell align="center">
                  {userReservations.numberOfPassengers}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          align="center"
          style={{
            width: 500,
            margin: "auto",
          }}
          variant="contained"
          color="primary"
          onClick={(e) => handleCancel(e, userReservations._id)}
          disabled={cancelPressed ? true : false}
        >
          {cancelPressed ? "Cancelled" : "Cancel"}
        </Button>
      </div>
      {/* </>
            );
          }
        }
      })} */}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default UserReservations;
