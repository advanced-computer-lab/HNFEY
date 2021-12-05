import React, { useContext, useState } from "react";
import {
  TextField,
  Container,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { UserContext } from "../../UserContext";

const Login = (props) => {
  const { setTypeOfUser, setUser } = useContext(UserContext);

  const history = useHistory();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);

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
          res.data.typeOfUser === "admin"
            ? setTypeOfUser(() => "admin")
            : setTypeOfUser(() => "user");

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
        axios
          .get("http://localhost:8000/hnfey/user/find-user/" + search)
          .then((res) => {
            switch (res.data.typeOfUser) {
              case "admin":
                setTypeOfUser(() => "admin");
                setUser(() => res.data.user);
                history.push("/admin", {
                  ...props.location.state,
                  user: res.data.user,
                });
                break;
              case "user":
                setTypeOfUser(() => "user");
                setUser(() => res.data.user);
                history.push("/user-profile", {
                  ...props.location.state,
                  user: res.data.user,
                });
                break;
              default:
                break;
            }
          })
          .catch(() => {
            setError(() => true);
          });
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
            error={error}
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
            error={error}
            helperText={error ? "Incorrect username or password" : ""}
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
          <Typography variant="h6">
            <Link href="/sign-up" style={{ fontSize: "20px" }}>
              Create Account
            </Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

export default Login;
