import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import SearchForm from "./components/SearchForm/SearchForm";
import FlightList from "./components/FlightList/FlightList";
import CreateFlightForm from "./components/CreateFlightForm/CreateFlightForm";
import ListAllFlights from "./components/ListAllFlights/ListAllFlights";
import EditFlight from "./components/EditFlight/EditFlight";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const brandTheme = createTheme({
    palette: { primary: { main: "#5388b4" }, secondary: { main: "#902923" } },
  });
  return (
    <MuiThemeProvider theme={brandTheme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/search" exact component={SearchForm} />
          <Route path="/list-flights" exact component={FlightList} />
          <Route path="/create-flight" exact component={CreateFlightForm} />
          <Route path="/list-all-flights" exact component={ListAllFlights} />
          <Route path="/edit/:id" exact component={EditFlight} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
