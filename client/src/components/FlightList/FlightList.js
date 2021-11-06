import React from 'react'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useEffect, useState } from 'react';
import Axios from "axios";
import { useLocation } from "react-router-dom";
import moment from 'moment';

export const FlightList = () => {

    const [flightList, setList] = useState([]);
    const location = useLocation();

//   useEffect(()=>{
//     Axios.get("http://localhost:8000/hnfey/flight/find-flight").then(res=>{
//         setList(res.data);
//   });
//   },[])

useEffect(() => {
    setList(location.state.detail);
 }, [location]);


    return (
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
                        </TableRow>
                    </TableHead>
                <TableBody>
          {flightList.map((flight) => (
            <TableRow
            //   key={flight.flightNumber}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{flight.flightNumber}</TableCell>
              <TableCell align="right">{moment(flight.departureTimeDate).format('YYYY-MM-DD')}</TableCell>
              <TableCell align="right">{moment(flight.arrivalTimeDate).format('YYYY-MM-DD')}</TableCell>
              <TableCell align="right">{flight.departureTerminal}</TableCell>
              <TableCell align="right">{flight.arrivalTerminal}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default FlightList;