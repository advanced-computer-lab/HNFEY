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


const UserReservations = () => {

  const history = useHistory();

  const [user, setUser] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const [departingFlight, setDepartingFlight] = useState({});
  const [arrivalFlight, setArrivalFlight] = useState({});
  const [cancelPressed, setCancelPressed] = useState(false);
  const location = useLocation();
  let url = "http://localhost:8000/hnfey/user/find-user?";
  let url2= "http://localhost:8000/hnfey/reservation/find-reservation?";
  let url3= "http://localhost:8000/hnfey/flight/list-flights?";
  let url4= "http://localhost:8000/hnfey/flight/list-flights?";
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
          const userIDQuery = "userId="+res.data.user._id;
          url2+= userIDQuery;
          
    });
    
       await Axios.get(url2).then((res) => {
            setUserReservations(() => res.data.reservation);
            const flightIDQuery = "_id="+res.data.reservation[0].departingFlightId;
          url3+= flightIDQuery;
          

          const flightIDQuery1 = "_id="+res.data.reservation[0].arrvivalFlightId;
          url4+= flightIDQuery1;
          

      });

          await Axios.get(url3)
          .then((res) => {
          res.data.flights.map((flight) =>{
            setDepartingFlight({ ...departingFlight, ['id'+ flight._id]:flight });

          })
          
             //setDepartingFlight(() => res.data.flights);
            //console.log(departingFlight);

       })

       await Axios.get(url4)
          .then((res) => {
            res.data.flights.map((flight) =>{
              setArrivalFlight({ ...arrivalFlight, ['id'+ flight._id]:flight });
  
            })

       })
  }
  fetchData();
    },[cancelPressed]);

    const handleCancel = async (e, reservationId) => {
      e.preventDefault();
      
      const reservation = {
        reservation: {_id:reservationId, status: "Cancelled" },
      };
      await Axios.put("http://localhost:8000/hnfey/reservation/edit-reservation", reservation).then((res) =>{
        console.log(res.data);
        setCancelPressed(true);
        console.log(cancelPressed);
      })
    };

    return user._id ? (
          
        <div>
            <h1>My reservations</h1>

            { userReservations.map((reservation) => {
                {const concat = 'id'+reservation.departingFlightId;
                const concat2='id'+reservation.arrvivalFlightId;
                console.log(arrivalFlight[concat2]);
                if(departingFlight[concat] && arrivalFlight[concat2]){
         return(
           <>
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
              <TableRow key={departingFlight[concat]._id}> 
                <TableCell
                  // onClick={() => handleCellClick(flight._id)}
                  component="th"
                  scope="row"
                >
                  {departingFlight[concat].flightNumber}
                </TableCell>
                <TableCell align="center">{departingFlight[concat].from}</TableCell>
                <TableCell align="center">{departingFlight[concat].to}</TableCell>
                <TableCell align="center">
                  {moment(departingFlight[concat].departureDateTime).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {moment(departingFlight[concat].arrivalDateTime).format("DD-MM-YYYY hh:mm A")}
                </TableCell>
                <TableCell align="center">{departingFlight[concat].departureTerminal}</TableCell>
                <TableCell align="center">{departingFlight[concat].arrivalTerminal}</TableCell>
                <TableCell align="center">{reservation.numberOfPassengers}</TableCell>
                <TableCell align="center">
                  
                  </TableCell>
      </TableRow>
     
                    <TableRow key={arrivalFlight[concat2]._id}>
                    <TableCell
                  // onClick={() => handleCellClick(flight._id)}
                  component="th"
                  scope="row"
                >
                  {arrivalFlight[concat2].flightNumber}
                  </TableCell>
                      {console.log(arrivalFlight[concat2].from)}
                    <TableCell align="center">{arrivalFlight[concat2].from}</TableCell>
                      <TableCell align="center">{arrivalFlight[concat2].to}</TableCell>
                        <TableCell align="center">
                            {moment(arrivalFlight[concat2].departureDateTime).format(
                              "DD-MM-YYYY hh:mm A"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {moment(arrivalFlight[concat2].arrivalDateTime).format("DD-MM-YYYY hh:mm A")}
                          </TableCell>
                          <TableCell align="center">{arrivalFlight[concat2].departureTerminal}</TableCell>
                          <TableCell align="center">{arrivalFlight[concat2].arrivalTerminal}</TableCell>
                          <TableCell align="center">{reservation.numberOfPassengers}</TableCell>
                          <TableCell align="center">
                            </TableCell>
                    </TableRow>
      </>
      </TableBody>
          </Table>
          </TableContainer>
          <br/>
          <br/>
          <Button align="center"
          style={{ width: 500}}
          variant="contained"
          color="primary"
          onClick={(e) => handleCancel(e, reservation._id)}
          disabled = {cancelPressed? true : false}

        >
          {cancelPressed? "Cancelled" : "Cancel"}
          
          
        </Button>  
        </>     
        )}}})}

          </div>
      )
      : (
        <CircularProgress />
      );
}

export default UserReservations
