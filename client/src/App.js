import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import SearchForm from "./components/SearchForm/SearchForm";
import FlightList from "./components/FlightList/FlightList";
import CreateFlightForm from "./components/CreateFlightForm/CreateFlightForm";
import ListAllFlights from "./components/ListAllFlights/ListAllFlights";
import EditFlight from "./components/EditFlight/EditFlight";
import Navbar from "./components/Navbar/Navbar";
import AdminHome from "./components/AdminHome/AdminHome";
import SearchResultsUser from "./components/SearchResultsUser/SearchResultsUser";
import Home from "./components/Home/Home";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import { ListUsers } from "./components/ListUsers/ListUsers";
import FlightDetails from "./components/FlightDetails/FlightDetails";
import Summary from "./components/Summary/Summary";
import UserProfile from "./components/UserProfile/UserProfile";
import Login from "./components/Login/Login";
import EditUser from "./components/EditUser/EditUser";
import UserReservations from "./components/UserReservations/UserReservations";
import SeatSelection from "./components/SeatSelection/SeatSelection";

const App = () => {
  const brandTheme = createTheme({
    palette: { primary: { main: "#5388b4" }, secondary: { main: "#902923" } },
    typography: {
      fontFamily: ["Montserrat", "Open Sans"].join(","),
    },
  });
  return (
    <MuiThemeProvider theme={brandTheme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-up" exact component={SignUpForm} />
          <Route path="/get-users" exact component={ListUsers} />
          <Route path="/admin" exact component={AdminHome} />
          <Route path="/login" exact component={Login} />
          <Route path="/edit-user" exact component={EditUser} />
          <Route path="/search" exact component={SearchForm} />
          <Route
            path="/flights-results-guest"
            exact
            component={SearchResultsUser}
          />
          <Route path="/list-flights" exact component={FlightList} />
          <Route path="/create-flight" exact component={CreateFlightForm} />
          <Route path="/list-all-flights" exact component={ListAllFlights} />
          <Route path="/edit/:id" exact component={EditFlight} />
          <Route
            path="/flight/seat-selection"
            exact
            component={SeatSelection}
          />
          <Route path="/flight/:id" exact component={FlightDetails} />
          <Route path="/flight-information" exact component={Summary} />
          <Route path="/user-profile" exact component={UserProfile} />
          <Route path="/user-reservations" exact component={UserReservations} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
