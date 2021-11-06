import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FlightForm from "./components/FlightForm/FlightForm";
import FlightList from "./components/FlightList/FlightList";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FlightForm} />
        <Route path="/list-flights" exact component={FlightList} />
      </Switch>
    </Router>
  );
};

export default App;
