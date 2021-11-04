import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FlightForm from "./components/FlightForm/FlightForm";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FlightForm} />
      </Switch>
    </Router>
  );
};

export default App;
