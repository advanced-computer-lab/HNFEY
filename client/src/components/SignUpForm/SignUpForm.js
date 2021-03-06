import React, { useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputAdornment from "@mui/material/InputAdornment";
import { useHistory } from "react-router";
import { createUser } from "../../api/auth";

const SignUpForm = () => {
  const history = useHistory();
  const [telephoneList, setTelephoneList] = useState([""]);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);
  const handleTelephoneNumberChange = (e, index) => {
    const list = [...telephoneList];
    list[index] = e.target.value;
    setTelephoneList(list);
    setUserDetails({ ...userDetails, telephoneNumbers: telephoneList });
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

    try {
      await createUser(user)
        .then((res) => history.push("/login"))
        .catch(() => setError(() => true));
    } catch (err) {
      alert(err);
    }
  };
  return (
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
          error={error}
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
          error={error}
          helperText={error ? "Username or email already exists" : ""}
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
  );
};

export default SignUpForm;
