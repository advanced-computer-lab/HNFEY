import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import axios from "axios";
const Summary = () => {
  const location = useLocation();
  const query = location.search;
  const flightIds = queryString.parse(query);
  const [departingFlight, setDepartingFlight] = useState({});
  const [returnFlight, setReturnFlight] = useState({});
  console.log(flightIds.departingFlight);
  const departingUrl =
    "http://localhost:8000/hnfey/flight/" + flightIds.departingFlight;
  console.log(departingUrl);
  const arrivalUrl =
    "http://localhost:8000/hnfey/flight/" + flightIds.returnFlight;

  useEffect(() => {
    axios
      .get(departingUrl)
      .then((res) => setDepartingFlight(() => res.data.flight));
    axios.get(arrivalUrl).then((res) => setReturnFlight(() => res.data.flight));
  }, [departingUrl, arrivalUrl]);

  return <div style={{ marginTop: "7%" }}>{flightIds.departingFlight}</div>;
};

export default Summary;
