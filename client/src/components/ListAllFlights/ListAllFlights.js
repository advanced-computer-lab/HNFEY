import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import Axios from "axios";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useEffect} from 'react';
import moment from 'moment';



export const ListAllFlights = () => {
    const [flights, setFlights] = useState([]);
    const history = useHistory();
     useEffect(()=>{
      Axios.get("http://localhost:8000/hnfey/flight/list-flights").then(res=>{
          setFlights(res.data.flights);
         // console.log(res.data.flights);
    });
    },[flights])

    const handleDelete = async (flightid) => {
    //e.preventDefault();
    //  console.log(flight.id);
    console.log(flightid);

    Axios.delete("http://localhost:8000/hnfey/flight/"+flightid);
    history.push("/list-all-flights");
    }

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
                        <TableCell align="right">Edit</TableCell>       
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
      {flights.map((flight) => (
         
        <TableRow
        key={flight._id}
        //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{flight.flightNumber}</TableCell>
          <TableCell align="right">{moment(flight.departureTimeDate).format('YYYY-MM-DD')}</TableCell>
          <TableCell align="right">{moment(flight.arrivalTimeDate).format('YYYY-MM-DD')}</TableCell>
          <TableCell align="right">{flight.departureTerminal}</TableCell>
          <TableCell align="right">{flight.arrivalTerminal}</TableCell>
          <TableCell align="right"><Button
                            style={{ width: 100 }}
                            variant="contained"
                            color="primary" >
                                Edit 
                            </Button>
                            </TableCell>
         <TableCell align="right"><Button
                            style={{ width: 100 }}
                            variant="contained"
                            onClick={() => handleDelete(flight._id)}
                            color="primary" >
                                Delete 
                            </Button>
                            </TableCell>
          
          
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
)

      }
export default ListAllFlights;


