import { Button, TextField, Container, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory,useLocation } from "react-router";
import queryString from "query-string";

const EditUser = () => {
  const history = useHistory();

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
    Axios.get(url).then((res) => setUser(res.data.user)
    );
  }, [url]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



 const handleSubmit = async (e) => {
     /*
    e.preventDefault();
    try {
      const flight = { flight: flightDetails };
      Axios.put("http://localhost:8000/hnfey/flight/edit-flight", flight).then(
        () => history.push("/list-all-flights")
      );
    } catch (err) {
      console.log(err);
    }
    */
   console.log('farouha')
  };
  

  return  (
    <div>
      <Container component="main" align="center" style={{ marginTop: "65px" }}>
         
      {user.map((user)=> {
           {console.log(user.firstName)}
        
      <>
         <br/>
         <br/>
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
            type="text"
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

          {user.telephoneNumbers.map((telephone)=> 
          {
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
      
      </>
       
        
         })}
         </Container>
    </div>
  ) 

// return  (
//     <div>
//       <Container component="main" align="center" style={{ marginTop: "px" }}>
         
//       {user?.map((user)=> {
//           return(
        
//       <>
//          <br/>
//          <br/>
//       <form onSubmit={handleSubmit}>
//           <Typography
//             style={{ marginTop: "65px" }}
//             variant="h4"
//             color="textSecondary"
//           >
//             Edit Information
//           </Typography>
//           <br />
//           <TextField
//             style={{ width: 500 }}
//             name="firstName"
//             onChange={handleChange}
//             value={user.firstName}
//             variant="outlined"
//             label="First Name"
//             type="text"
//             required
//           />
//           <br />
//           <br />

//           <TextField
//             style={{ width: 500 }}
//             name="lastName"
//             onChange={handleChange}
//             variant="outlined"
//             label="Last Name"
//             value={user.lastName}
//             type="text"
//             required
//           />
//           <br />
//           <br />
//           <TextField
//             style={{ width: 500 }}
//             name="email"
//             onChange={handleChange}
//             variant="outlined"
//             label="Email"
//             value={user.email}
//             type="text"
//             required
//           />

//           <br />
//           <br />

//           <TextField
//             style={{ width: 500 }}
//             name="password"
//             onChange={handleChange}
//             variant="outlined"
//             label="Password"
//             value={user.password}
//             type="password"
//             required
//           />

//           <br />
//           <br />
          
//           <TextField
//             style={{ width: 500 }}
//             name="homeAddress"
//             onChange={handleChange}
//             variant="outlined"
//             label="Home Address"
//             value={user.homeAddress}
//             type="text"
//             required
//           />

//           <br />
//           <br />
//           <TextField
//             style={{ width: 500 }}
//             name="countryCode"
//             onChange={handleChange}
//             variant="outlined"
//             label="Country Code"
//             value={user.countryCode}
//             type="text"
//             required
//           />

//           <br />
//           <br />

//           {user.telephoneNumbers.map((telephone)=> 
//           {
//               console.log(user.telephoneNumbers)
//               return(
              
//             <TextField
//             style={{ width: 500 }}
//             name="telephoneNumber"
//             onChange={handleChange}
//             variant="outlined"
//             label="Telephone Number"
//             value={telephone}
//             type="text"
//             required
//           />
//           )
//           })}
//         <br/>
//           <br/>
        
        

//           <Button
//             type="submit"
//             style={{ width: 500 }}
//             variant="contained"
//             color="primary"
//           >
//             Edit
//           </Button>
     
//       </form>
      
//       </>
       
        
//          )})}
//          </Container>
//     </div>
//   ) 
};

export default EditUser;
