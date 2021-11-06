import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import { Button } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const FlightList = () => {
  // const history = useHistory();
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
    (async () => {
      const { data } = await Axios.get(url);
      setList(data.flights);
    })();
  }, [url, flightList]);

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
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const handleDelete = async (flightId) => {
    await Axios.delete("http://localhost:8000/hnfey/flight/" + flightId);
    setList(flightList.filter((flight) => flight._id !== flightId));
    //history.push("/list-flights");
  };
  return flightList ? (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell align="right">Departure Time</TableCell>
              <TableCell align="right">Arrival Time</TableCell>
              <TableCell align="right">Departure Terminal</TableCell>
              <TableCell align="right">Arrival Terminal</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flightList?.map((flight) => (
              <TableRow
                key={flight._id}
                //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {flight.flightNumber}
                </TableCell>
                <TableCell align="right">
                  {moment(flight.departureTimeDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="right">
                  {moment(flight.arrivalTimeDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="right">{flight.departureTerminal}</TableCell>
                <TableCell align="right">{flight.arrivalTerminal}</TableCell>

                <TableCell align="right">
                  <Button
                    style={{ width: 100 }}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    style={{ width: 100 }}
                    variant="contained"
                    onClick={() => submit(flight._id)}
                    color="primary"
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
