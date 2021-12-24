import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Table,
} from "@material-ui/core";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import { deleteFlight, findAllFlights } from "../../api/flight";

export const ListAllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const history = useHistory();
  useEffect(() => {
    findAllFlights("http://localhost:8000/hnfey/flight/list-flights").then((res) => {
      setFlights(() => res.data.flights);

      if (deleted) {
        setDeleted(() => false);
      }
    });
  }, [deleted]);

  const submit = (flightid) => {
    confirmAlert({
      title: "Are you sure you want to delete this flight?",
      message: "Are you sure you want to delete this flight?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(flightid),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleDelete = async (flightId) => {
  deleteFlight(flightId);
  setDeleted(true);
  history.push("/list-all-flights");
};

  const handleCellClick = async (flightId) => {
    history.push("/flight/" + flightId);
  };

  const handleEdit = async (e, flightId) => {
    e.preventDefault();
    history.push("/edit/" + flightId);
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ marginTop: "65px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Departure Time</TableCell>
              <TableCell align="center">Arrival Time</TableCell>
              <TableCell align="center">Departure Terminal</TableCell>
              <TableCell align="center">Arrival Terminal</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight._id}>
                <TableCell
                  onClick={() => handleCellClick(flight._id)}
                  component="th"
                  scope="row"
                >
                  {flight.flightNumber}
                </TableCell>
                <TableCell align="center">{flight.from}</TableCell>
                <TableCell align="center">{flight.to}</TableCell>
                <TableCell align="center">
                  {moment(flight.departureDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {moment(flight.arrivalDateTime).format("DD-MM-YYYY hh:mm A")}
                </TableCell>
                <TableCell align="center">{flight.departureTerminal}</TableCell>
                <TableCell align="center">{flight.arrivalTerminal}</TableCell>
                <TableCell align="center">
                  <Button
                    style={{ width: 100 }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleEdit(e, flight._id)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    style={{ width: 100 }}
                    variant="contained"
                    onClick={() => submit(flight._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ListAllFlights;
