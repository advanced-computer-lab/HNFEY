import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FlightForm from "./components/FlightForm/FlightForm";
import FlightList from "./components/FlightList/FlightList";
import CreateFlightForm from "./components/CreateFlightForm/CreateFlightForm";
import ListAllFlights from "./components/ListAllFlights/ListAllFlights";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FlightForm} />
        <Route path="/list-flights" exact component={FlightList} />
        <Route path="/create-flight" exact component={CreateFlightForm} />
        <Route path="/list-all-flights" exact component={ListAllFlights} />

      </Switch>
    </Router>
  );
};

export default App;
