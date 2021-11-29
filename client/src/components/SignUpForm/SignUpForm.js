import React, { useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import Axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputAdornment from "@mui/material/InputAdornment";
import { useHistory } from "react-router";

const SignUpForm = () => {
  const history = useHistory();
  const [telephoneList, setTelephoneList] = useState([""]);
  const [userDetails, setUserDetails] = useState({});

  const handleTelephoneNumberChange = (e, index) => {
    // const { name, value } = e.target;
    const list = [...telephoneList];
    list[index] = e.target.value;
    setTelephoneList(list);
    // setTelephoneList(...telephoneList, e.target.value);
    setUserDetails({ ...userDetails, telephoneNumbers: telephoneList });
    console.log(userDetails);
  };

  const handleAddClick = () => {
    setTelephoneList([...telephoneList, ""]);
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const user = {
      user: userDetails,
    };

    let url = "http://localhost:8000/hnfey/user/";

    try {
      await Axios.post(url, user);
      history.push("/get-users");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <Container component="main" align="center" style={{ marginTop: "65px" }}>
        <form onSubmit={handleCreate}>
          <br />
          <TextField
            label="First Name"
            name="firstName"
            onChange={handleChange}
            style={{ width: 500 }}
            variant="outlined"
            required
          />
          <br />
          <br />
          <TextField
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            style={{ width: 500 }}
            variant="outlined"
            required
          />
          <br />
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
            label="Email"
            name="email"
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
          ></TextField>
          <br />
          <br />
          <TextField
            label="Passport Number"
            name="passportNumber"
            onChange={handleChange}
            style={{ width: 500 }}
            variant="outlined"
            required
          />
          <br />
          <br />
          {telephoneList.map((x, i) => {
            if (i > 0) {
              return (
                <>
                  <TextField
                    label="Telephone Number"
                    name="telephoneNumbers"
                    onChange={(e) => handleTelephoneNumberChange(e, i)}
                    style={{ width: 500 }}
                    variant="outlined"
                  />
                  <br />
                  <br />
                </>
              );
            } else {
              return (
                <>
                  <TextField
                    label="Telephone Number"
                    name="telephoneNumbers"
                    onChange={(e) => handleTelephoneNumberChange(e, i)}
                    style={{ width: 500 }}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AddCircleIcon onClick={handleAddClick} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                  <br />
                  <br />
                </>
              );
            }
          })}

          <TextField
            label="Home Address"
            name="homeAddress"
            onChange={handleChange}
            style={{ width: 500 }}
            variant="outlined"
            required
          />
          <br />
          <br />

          <TextField
            label="Country Code"
            name="countryCode"
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
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default SignUpForm;
