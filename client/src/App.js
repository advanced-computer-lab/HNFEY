import React from 'react';
import { BrowserRouter as Router, Route, Routes }  from 'react-router-dom';
import FlightForm from './components/FlightForm/FlightForm';


const App = () => {
  return (

    <Router>
      <Routes>
      <Route path="/" exact element={<FlightForm />} />
      </Routes>
    </Router>
  )

}

export default App;
