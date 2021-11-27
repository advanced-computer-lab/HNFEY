import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import {
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Table,
} from "@material-ui/core";

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';


export const FlightList = () => {
  const history = useHistory();
  const [departureFlightList, setDepartureList] = useState([]);
  const [returnFlightList, setReturnList] = useState([]);

  const location = useLocation();
  let departureUrl = "http://localhost:8000/hnfey/flight/?";
  let returnUrl = "http://localhost:8000/hnfey/flight/?";
  let departureQuery = queryString.parse(location.search);
  const returnQuery = {
    from: departureQuery.to,
    to: departureQuery.from,
    departureDay: departureQuery.returnDate,
    passengers: departureQuery.passengers,
    class: departureQuery.class,
  }


  const noOfKeys = Object.keys(departureQuery).length;

  Object.entries(departureQuery).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (departureUrl += key + "=" + value + last);
  });


  Object.entries(returnQuery).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (returnUrl += key + "=" + value + last);
  });

  useEffect(() => {
    Axios.get(departureUrl).then((res) => setDepartureList(res.data.flights));
    Axios.get(returnUrl).then((res) => setReturnList(res.data.flights));
  }, [departureUrl, returnUrl]); //might be flights

  return departureFlightList && returnFlightList ? (
    <div>
      {/* <TableContainer component={Paper} style={{ marginTop: "65px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Departure Time</TableCell>
              <TableCell align="center">Arrival Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departureFlightList?.map((flight) => (
              <TableRow
                key={flight._id}
                //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
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
              </TableRow>
            ))}
          </TableBody>

          <TableBody>
            {returnFlightList?.map((flight) => (
              <TableRow
                key={flight._id}
                //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
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
              </TableRow>
            ))}
          </TableBody>


        </Table>
      </TableContainer> */}

      <Container style={{ marginTop: "100px" }}>
        Choose your departure flight
        <br/>
        <br/>

      {departureFlightList?.map((flight) => (
        <Link to={'/'}>
            <Card style={{ width: "50%", height: "100px" }}>
              {moment(flight.departureDateTime).format(
                    "hh:mm A"
                  )} - {moment(flight.arrivalDateTime).format(
                    "hh:mm A"
                  )}
              <br/>
              {flight.from} - {flight.to}
            </Card>
            </Link>
          ))}
      </Container>
  
      <Container style={{ marginTop: "100px" }}>
      Choose your return flight
      <br/>
      <br/>
      {returnFlightList?.map((flight) => (
          <Link to={'/'}>
            <Card style={{ width: "50%", height: "100px"}} >
              {moment(flight.departureDateTime).format(
                    "hh:mm A"
                  )} - {moment(flight.arrivalDateTime).format(
                    "hh:mm A"
                  )}
              <br/>
              {flight.from} - {flight.to}
            </Card>
            </Link>
          ))}
      </Container>

    </div>
  ) : null;
};

export default FlightList;
