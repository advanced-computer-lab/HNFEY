import React, { useState } from "react";
import { Button } from "@material-ui/core";
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
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";

const ReservationDetails = (props) => {
  const [userReservations, setUserReservations] = useState({});
  const [user, setUser] = useState({});
  const [departingFlight, setDepartingFlight] = useState({});
  const [arrivalFlight, setArrivalFlight] = useState({});
  const [cancelPressed, setCancelPressed] = useState("");
  let url3 = "http://localhost:8000/hnfey/flight/list-flights?";
  let url4 = "http://localhost:8000/hnfey/flight/list-flights?";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUserReservations(() => props.location.state.userReservation);
    setUser(() => props.location.state.user);
    setMounted(() => true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const fetchData = async () => {
        {
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

        await Axios.get(url3).then((res) => {
          setDepartingFlight(() => res.data.flights[0]);
        });
        await Axios.get(url4).then((res) => {
          setArrivalFlight(() => res.data.flights[0]);
        });
      };
      fetchData();
    }
  }, [userReservations]);

  const cancel = (e, reservationId) => {
    confirmAlert({
      title: "Are you sure you want to cancel this reservation?",
      message: "Are you sure you want to cancel this reservation?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleCancel(e, reservationId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
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
  return userReservations._id &&
    departingFlight._id &&
    arrivalFlight._id &&
    user._id ? (
    <div>
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
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              <TableRow key={departingFlight._id}>
                <TableCell component="th" scope="row">
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
                <TableCell component="th" scope="row">
                  {arrivalFlight.flightNumber}
                </TableCell>
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
          onClick={(e) => cancel(e, userReservations._id)}
          disabled={cancelPressed ? true : false}
        >
          {cancelPressed ? "Cancelled" : "Cancel"}
        </Button>
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default ReservationDetails;
