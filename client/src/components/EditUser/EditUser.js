import { Button, TextField, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { editUser } from "../../api/user";

const EditUser = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).user
  );
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userBody = { user: user };

      editUser(userBody).then(() => {
        localStorage.setItem(
          "profile",
          JSON.stringify({
            message: JSON.parse(localStorage.getItem("profile")).message,
            token: JSON.parse(localStorage.getItem("profile")).token,
            uType: JSON.parse(localStorage.getItem("profile")).uType,
            user: user,
          })
        );
        history.push("/user-profile", props.location.state);
      });
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
            name="username"
            onChange={handleChange}
            variant="outlined"
            label="User Name"
            value={user.username}
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
            return (
              <React.Fragment key={telephone}>
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
              </React.Fragment>
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
