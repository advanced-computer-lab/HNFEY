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

const UserReservations = () => {

    const history = useHistory();

  const [user, setUser] = useState({});
  const [userReservations, setUserReservations] = useState({});
  const location = useLocation();
  let url = "http://localhost:8000/hnfey/user/find-user?";
  let url2= "http://localhost:8000/hnfey/reservation/find-reservation?";
  let query = queryString.parse(location.search);
  const noOfKeys = Object.keys(query).length;
  Object.entries(query).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (url += key + "=" + value + last);
  });
  
useEffect(() => {
    Axios.get(url).then((res) => {
        setUser(() => res.data.user);
    });
    if(user._id){
        const userIDQuery = "userId="+user._id;
        url2+= userIDQuery;
        console.log(url2);
        Axios.get(url2).then((res) => {
            setUserReservations(() => res.data.reservation);
      });
    }
  }, [url]);

    return (
        <div>
            {console.log(userReservations)}
        </div>
      ); 
}

export default UserReservations
