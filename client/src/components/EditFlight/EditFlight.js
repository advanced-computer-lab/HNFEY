import { Button, TextField } from '@material-ui/core';
import { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

const EditFlight = () => {
    const { id } = useParams();
    const history = useHistory();
    const [flightDetails, setFlightDetails] = useState({});


    useEffect(() => {
        (async () => {
            const { data } = await Axios.get("http://localhost:8000/hnfey/flight" + id);
            setFlightDetails(data.flight);
        })();
    }, [flightDetails, id]);

    const handleChange = (e) => {
        setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const flight = { flight: flightDetails };
            Axios.post("http://localhost:8000/hnfey/flight/create-flight", flight);
            history.push("/list-flights");
        } catch (err) {
            console.log(err);
        }
    };

    return flightDetails?._id ? (
        <>
            <br />
            <br />

            <TextField
                style={{ width: 500 }}
                name="flightNumber"
                onChange={handleChange}
                value={flightDetails.flightNumber}
                variant="outlined"
                label="Flight Number"
                type="text"
            />
            <br />
            <br />

            <TextField
                style={{ width: 500 }}
                name="departureTime"
                onChange={handleChange}
                value={flightDetails.departureTime}
                variant="outlined"
                label="Departure Time"
                type="text"
            />
            <br />
            <br />

            <TextField
                style={{ width: 500 }}
                name="arrivalTime"
                value={flightDetails.arrivalTime}
                onChange={handleChange}
                variant="outlined"
                label="Arrival Time"
                type="text"
            />

            <br />
            <br />

            <TextField
                style={{ width: 500 }}
                onChange={handleChange}
                value={flightDetails.departureTerminal}
                name="departureTerminal"
                variant="outlined"
                label="Departure Terminal"
                type="text"
            />

            <br />
            <br />

            <TextField
                style={{ width: 500 }}
                onChange={handleChange}
                value={flightDetails.arrivalTerminal}
                name="arrivalTerminal"
                variant="outlined"
                label="Arrival Terminal"
                type="text"
            />

            <br />
            <br />

            <Button
                style={{ width: 500 }}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
            >
                Edit
            </Button>
        </>
    ) : null;
}

export default EditFlight;
