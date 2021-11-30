import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import Axios from "axios";
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
import { CircularProgress } from "@material-ui/core";


const UserReservations = () => {

  const history = useHistory();

  const [user, setUser] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const [departingFlight, setDepartingFlight] = useState({});
  const [arrivalFlight, setArrivalFlight] = useState({});
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
    },[]);

    return user._id ? (
        <div>
          {/* {console.log(arrivalFlight.id61a13cdde995fc9671399ebe)} */}
          {userReservations.map((reservation) => {
            {const concat = 'id'+reservation.departingFlightId;
             console.log(concat);
             if(departingFlight._id)
            console.log(departingFlight.id61890bcf7c8b767173907e47.to)}

          })}
        </div>
      )
      : (
        <CircularProgress />
      );
}

export default UserReservations
