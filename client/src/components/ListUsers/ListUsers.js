import React, { useState } from "react";
import { useHistory } from "react-router";
import Axios from "axios";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Table,
} from "@material-ui/core";

export const ListUsers = () => {
  const [users, setUsers] = useState([]);

  const history = useHistory();
  Axios.get("http://localhost:8000/hnfey/user/").then((res) => {
    setUsers(res.data.users);
  });

  return (
    <div>
      <TableContainer component={Paper} style={{ marginTop: "65px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Password</TableCell>
              <TableCell align="center">Passport Number</TableCell>
              <TableCell align="center">Telephone Numbers</TableCell>
              <TableCell align="center">Home Address</TableCell>
              <TableCell align="center">Country Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.firstName}
                </TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.password}</TableCell>
                <TableCell align="center">{user.passportNumber}</TableCell>
                <TableCell align="center">{user.telephoneNumbers}</TableCell>
                <TableCell align="center">{user.homeAddress}</TableCell>
                <TableCell align="center">{user.countryCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ListUsers;
