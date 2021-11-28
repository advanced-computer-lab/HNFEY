import React, { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
const Summary = () => {
  const location = useLocation();
  const query = location.search;
  const flightIds = queryString.parse(query);
  return <div style={{ marginTop: "7%" }}>{flightIds.departingFlight}</div>;
};

export default Summary;
