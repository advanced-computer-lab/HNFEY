import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Container, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Card from "@mui/material/Card";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const location = useLocation();
  let url = "http://localhost:8000/hnfey/user/find-user?";
  let query = queryString.parse(location.search);
  const noOfKeys = Object.keys(query).length;
  Object.entries(query).map((entry, i) => {
    let [key, value] = entry;
    let last = i + 1 === noOfKeys ? "" : "&";
    return (url += key + "=" + value + last);
  });

  useEffect(() => {
    Axios.get(url).then((res) => setUser(res.data.user));
  }, [url]);

  return (
    <div>
      <Container component="main" align="center" style={{ marginTop: "65px" }}>
        <AccountCircleIcon
          style={{ fontSize: "150", marginTop: "20px" }}
          width="500px"
        />
        {console.log(user)}
        {user?.map((user) => (
          <>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <h4> {user.email}</h4>
            <Card
              style={{ width: "350px", alignment: "center", margin: "auto" }}
            >
              <Button variant="outlined" style={{ width: "100%" }}>
                Edit
              </Button>
            </Card>
          </>
        ))}
      </Container>
    </div>
  );
};

export default UserProfile;
