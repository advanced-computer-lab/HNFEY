import { Button, TextField, Container, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from "../../UserContext";

const EditUser = (props) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const history = useHistory();
  const location = useLocation();
  let url;
  if (!user._id) {
    url =
      "http://localhost:8000/hnfey/user/find-user?username=" +
      props.location.state.user.username;
  } else {
    url =
      "http://localhost:8000/hnfey/user/find-user?username=" + user.username;
    // const noOfKeys = Object.keys(user).length;
    // Object.entries(user).map((entry, i) => {
    //   let [key, value] = entry;
    //   let last = i + 1 === noOfKeys ? "" : "&";
    //   return (url += key + "=" + value + last);
    // });
  }

  useEffect(() => {
    Axios.get(url).then((res) => {
      setUser(res.data.user);
    });
  }, [setUser, url]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userBody = { user: user };
      Axios.put("http://localhost:8000/hnfey/user/edit-user", userBody).then(
        () => history.push("/user-profile" + location.search)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return user._id && user.telephoneNumbers ? (
    <div>
      <Container component="main" align="center" style={{ marginTop: "px" }}>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <Typography
            style={{ marginTop: "65px" }}
            variant="h4"
            color="textSecondary"
          >
            Edit Information
          </Typography>
          <br />
          <TextField
            style={{ width: 500 }}
            name="firstName"
            onChange={handleChange}
            value={user.firstName}
            variant="outlined"
            label="First Name"
            type="text"
            required
          />
          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            name="lastName"
            onChange={handleChange}
            variant="outlined"
            label="Last Name"
            value={user.lastName}
            type="text"
            required
          />
          <br />
          <br />
          <TextField
            style={{ width: 500 }}
            name="email"
            onChange={handleChange}
            variant="outlined"
            label="Email"
            value={user.email}
            type="email"
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            name="password"
            onChange={handleChange}
            variant="outlined"
            label="Password"
            value={user.password}
            type="password"
            required
          />

          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            name="homeAddress"
            onChange={handleChange}
            variant="outlined"
            label="Home Address"
            value={user.homeAddress}
            type="text"
            required
          />

          <br />
          <br />
          <TextField
            style={{ width: 500 }}
            name="countryCode"
            onChange={handleChange}
            variant="outlined"
            label="Country Code"
            value={user.countryCode}
            type="text"
            required
          />

          <br />
          <br />

          {user.telephoneNumbers.map((telephone) => {
            console.log(user.telephoneNumbers);

            return (
              <>
                <TextField
                  style={{ width: 500 }}
                  name="telephoneNumber"
                  onChange={handleChange}
                  variant="outlined"
                  label="Telephone Number"
                  value={telephone}
                  type="text"
                  required
                />
                <br />
                <br />
              </>
            );
          })}

          <Button
            type="submit"
            style={{ width: 500 }}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </form>

        {/* })} */}
      </Container>
    </div>
  ) : (
    <Container component="main">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    </Container>
  );
};

export default EditUser;
