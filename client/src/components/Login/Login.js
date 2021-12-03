import React, { useState } from "react";
import { TextField, Container, Button, Link } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";

const Login = (props) => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({});

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      props.location?.state?.flightToSelect &&
      props.location?.state?.flightInQueue
    ) {
      axios
        .get(
          "http://localhost:8000/hnfey/user/find-user/?username=" +
            userDetails.username
        )
        .then((res) => {
          history.push("/flight/seat-selection", {
            ...props.location.state,
            userId: res.data.user._id,
          });
        });
    } else {
      const noOfKeys = Object.keys(userDetails).length;
      let search = "?";
      Object.entries(userDetails).map((entry, i) => {
        let [key, value] = entry;
        let last = i + 1 === noOfKeys ? "" : "&";
        return (search += key + "=" + value + last);
      });
      try {
        history.push("/user-profile" + search);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <Container component="main" align="center" style={{ marginTop: "100px" }}>
        <form onSubmit={handleSubmit}>
          <br />
          <TextField
            label="User Name"
            name="username"
            onChange={handleChange}
            style={{ width: 500 }}
            variant="outlined"
            required
          />
          <br />
          <br />

          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            style={{ width: 500 }}
            variant="outlined"
            required
          />
          <br />
          <br />

          <Button
            type="submit"
            style={{ width: 500 }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <br />
          <br />
          <Link href="/sign-up" style={{ fontSize: "20px" }}>
            Create Account
          </Link>
        </form>
      </Container>
    </div>
  );
};

export default Login;
