import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const FlightList = () => {
  const history = useHistory();
  const [flightList, setList] = useState([]);
  const location = useLocation();
  let url = "http://localhost:8000/hnfey/flight/list-flights?";
  let query = queryString.parse(location.search);
  const noOfKeys = Object.keys(query).length;
  Object.entries(query).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (url += key + "=" + value + last);
  });

  useEffect(() => {
    Axios.get(url).then((res) => setList(res.data.flights));
  }, [url]); //might be flights

  const submit = (flightId) => {
    confirmAlert({
      title: "Are you sure you want to delete this flight?",
      message: "Are you sure you want to delete this flight?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(flightId),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleDelete = async (flightId) => {
    await Axios.delete("http://localhost:8000/hnfey/flight/" + flightId);
    setList(flightList.filter((flight) => flight._id !== flightId));
  };

  const handleEdit = async (e, flightid) => {
    e.preventDefault();
    history.push("/edit/" + flightid);
  };
  return flightList ? (
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
            {flightList?.map((flight) => (
              <TableRow
                key={flight._id}
                //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" key={flight._id}>
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
  ) : null;
};

export default FlightList;
