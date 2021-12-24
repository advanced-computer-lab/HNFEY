import { Button, TextField, Container, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../UserContext";
import { updatePassword } from "../../api/auth";

const ChangePassword = (props) => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [errorCurrentPassword, setErrorCurrent] = useState(false);
  const [errorPasswordRetype, setErrorRetype] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordRetyped, setCurrentPasswordRetyped] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRetyped, setNewPasswordRetyped] = useState("");

  // let url;
  // if (!user._id) {
  //   url =
  //     "http://localhost:8000/hnfey/user/find-user?username=" +
  //     props.location.state.user.username;
  // } else {
  //   url =
  //     "http://localhost:8000/hnfey/user/find-user?username=" + user.username;
  // }
  // useEffect(() => {
  //   Axios.get(url).then((res) => {
  //     setUser(res.data.user);
  //     setCurrentPassword(() => res.data.user.password);
  //   });
  // }, [setUser, url]);

  const handleChange = (e) => {
    setErrorCurrent(() => false);
    setErrorRetype(() => false);
    if (e.target.name === "currentPassword") {
      setCurrentPasswordRetyped(() => e.target.value);
    } else if (e.target.name === "passwordRetyped") {
      setNewPasswordRetyped(() => e.target.value);
    } else setNewPassword(() => e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passswordBody = {
      old_password: currentPasswordRetyped,
      password: newPasswordRetyped,
    };

    if (newPasswordRetyped === newPassword) {
      updatePassword(passswordBody).then(() =>
        history.push("/user-profile", {
          ...props.location.state,
          user,
        })
      );
    } else {
      // currentPasswordRetyped === currentPassword
      //   ? setErrorCurrent(() => false)
      //   : setErrorCurrent(() => true);
      newPasswordRetyped === newPassword
        ? setErrorRetype(() => false)
        : setErrorRetype(() => true);
    }
    // if (
    //   currentPasswordRetyped === currentPassword &&
    //   newPasswordRetyped === user.password
    // ) {
    //   try {
    //     const userBody = { user: user };
    //     Axios.put("http://localhost:8000/hnfey/user/edit-user", userBody).then(
    //       () =>
    //         history.push("/user-profile", {
    //           ...props.location.state,
    //           user,
    //         })
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } else {
    //   currentPasswordRetyped === currentPassword
    //     ? setErrorCurrent(() => false)
    //     : setErrorCurrent(() => true);
    //   newPasswordRetyped === user.password
    //     ? setErrorRetype(() => false)
    //     : setErrorRetype(() => true);
    // }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      history.push("/user-profile", {
        ...props.location.state,
        user,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
            Change Password
          </Typography>
          <br />
          <TextField
            style={{ width: 500 }}
            name="currentPassword"
            error={errorCurrentPassword}
            helperText={
              errorCurrentPassword ? "Doesn't match current password" : ""
            }
            onChange={handleChange}
            variant="outlined"
            label="Current Password"
            type="password"
            required
          />
          <br />
          <br />

          <TextField
            style={{ width: 500 }}
            name="password"
            onChange={handleChange}
            error={errorPasswordRetype}
            variant="outlined"
            label="New Password"
            type="password"
            required
          />
          <br />
          <br />
          <TextField
            style={{ width: 500 }}
            name="passwordRetyped"
            error={errorPasswordRetype}
            helperText={errorPasswordRetype ? "Passwords don't match" : ""}
            onChange={handleChange}
            variant="outlined"
            label="Retype New Password"
            type="password"
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
            Edit
          </Button>
          <br />
          <br />
        </form>
        <Button
          type="submit"
          style={{ width: 500 }}
          onClick={handleBack}
          variant="contained"
          color="primary"
        >
          Back
        </Button>
      </Container>
    </div>
  );
};

export default ChangePassword;
