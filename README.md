# HNFEY

**Project Title**:

This project is a web development project of an airline reservation system called HNFEY Air. HNFEY Air is a website were users can search, select, and book flights in a convenient and smooth way.

**Motivation**:

We decided to do this project as it gave us the opportunity to create a fully fucntional website with all the features a users might need or use. This was project was built to create for users an easy interface to able to search and book for flights online smoothly and quickly without facing booking problems.

**Build Status**:

**Code Style**:
Decently commented and documented
Prettier tool used to manage white space and indentations
Egyptian braces used: always in the end of the line
braces not used in oneliners
Single quotes are preffered than double quotes
comments are written as a prefix of each line by // instead of large blocks of code with /* ... */


**Frameworks**:

MERN Stack was used throughout this project which is Mongo DB, Express, React js and Node.js. Our database is hosted on Mongo DB which is a NoSQL Database. The backend was constructed using node.js and express frameworks. Finally, the frontend of the project was constructed using React.js framework.

**Features**:

In this website, you can easily view all flights and reserve any available flight based on your criteria and all the flight seats will be displayed and you will be able to choose any of the availabe ones to book it and also you can smoothly and quickly pay online with your Visa/Credit Card, no need for cash or any hassle.

**Installation**:
-You need to install any IDE to be able to open the project.
-You need to install Node.js "https://nodejs.org/en/download/"
-You need to install Express "https://expressjs.com/en/starter/installing.html"
-You need to install React.JS "https://reactjs.org/docs/create-a-new-react-app.html"
In this project we used the MERN stack so to install all of these

**API Reference**

 Stripe API was used to create payments and issue refunds and add partial payments


**How To Use**:
There are three types of users on our website, either a guest user, an existing user or the admin of the website. A guest user has authority to search for a flight according to his/her prefernces, navigate through all the search results, choose the departing and return flight that are most convenient to him/her all the way till he/she reaches a page with the selected flights’ details and the option to proceed to checkout. At this point, a guest user cannot proceed and will be asked to login to their account if they are existing users or will be given the option to create a new account. After login/signup, the user is no longer a guest user and is now an existing user that can proceed to checkout which consists of selecting preferred seats on departure and return flights, paying online for the selected departure and return flights, viewing a detailed summary of his/her booking including number of passengers and their details, selected seats, price, terminals, baggage allowance, departure and return dates and times, etc. and finally, receiving a confirmation email with all necessary details of the booking. An existing logged in user has the ability to update his/her information, view all previous reservations and edit or even cancel an upcoming reservation in a smooth and straightforward way. On the other hand, an admin has the ability to control the whole airline system. Namely, he/she can create new flights, edit existing flights, delete existing flights and view all existing flights for administrative purposes.

**ScreenShots**:

![Home](/ScreenShots/Home.png?raw=true "Home")
![SearchResults](/ScreenShots/SearchResults.png?raw=true "SearchResults")
![Login](/ScreenShots/Login.png?raw=true "Login")
![UserProfile](/ScreenShots/UserProfile.png?raw=true "UserProfile")
![ReservationDetails1](/ScreenShots/ReservationDetails1.png?raw=true "ReservationDetails1")
![ReservationDetails2](/ScreenShots/ReservationDetails2.png?raw=true "ReservationDetails2")
![ChoseFlightSeats](/ScreenShots/ChoseFlightSeats.png?raw=true "ChoseFlightSeats")
![Summary](/ScreenShots/Summary.png?raw=true "Summary")
![AddPassengers](/ScreenShots/AddPassengers.png?raw=true "AddPassengers")
![Payment](/ScreenShots/Payment.png?raw=true "Payment")
![ReservationSummary](/ScreenShots/ReservationSummary.png?raw=true "ReservationSummary")
![AdminHome](/ScreenShots/AdminHome.png?raw=true "AdminHome")
![AllFlightsList](/ScreenShots/AllFlightsList.png?raw=true "AllFlightsList")
![CreatingFlight](/ScreenShots/CreatingFlight.png?raw=true "CreatingFlight")

**Testing**:
As the project did not implement a testing framework such as jest, we had to test it by trial and error throughout the whole implementation process. Initially, when we had no proper UI implemented, we had to test using postman. To explain more, when we wanted to test that a flight is added successfully into our database, we had to create a post request on postman and check the response to see if the route under test is working as intended or not. Later, when we started to have things viewed on our website such as viewing all flights, viewing search results, etc., testing became easier because we could now see the effect of the functions directly on the website. For example, when testing the delete flight functionality, we could easily see if it was deleted or not using our UI as opposed to having to go to the database itself and check if it had been deleted like we used to do in early stages of implementation.


**Code Example**
——Backend login route——

router.post(
  "/login",
  controller.loginUserAndAdminPipeline,
  async (req, res) => {
    res.status(200).json({
      message: "Logged in successfully!",
      user: req.user,
      typeOfUser: req.typeOfUser,
      token: req.token,
    });
  }
);

——Authentication pipeline——

const loginUserAndAdminPipeline = [
  findAdminAccount,
  authenticateAdmin,
  generateAdminJWT,
  findUserAccount,
  authenticateUser,
  generateJWT,
];

——Functions in the pipeline——


const findAdminAccount = async (req, res, next) => {
  try {
    const admin = await model.fetchAdminByUsername(req.body.user.username);
    if (admin) {
      req.user = admin.toJSON();
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authenticateAdmin = async (req, res, next) => {
  if (req.user) {
    const passIsValid = await authUtils.comparePassword(
      req.body.user.password,
      req.user.password
    );
    if (passIsValid) {
      req.typeOfUser = "admin";
      next();
    } else {
      const err = new Error("Invalid email or password");
      err.code = 400;
      err.name = "Unauthenticated";
      next(err);
    }
  } else {
    next();
  }
};

const generateAdminJWT = async (req, res, next) => {
  if (req.typeOfUser !== "admin") next();
  else {
    delete req.user.password;
    const token = authUtils.generateToken(req.user);
    req.token = token;
    next();
  }
};

const findUserAccount = async (req, res, next) => {
  try {
    if (req.typeOfUser === "admin") {
      next();
    }
    const user = await model.fetchUserByUsername(req.body.user.username);
    req.user = user.toJSON();
    next();
  } catch (err) {
    next(err);
  }
};


const authenticateUser = async (req, res, next) => {
  if (req.typeOfUser === "admin") {
    next();
  } else {
    const passIsValid = await authUtils.comparePassword(
      req.body.user.password,
      req.user.password
    );
    if (passIsValid) {
      req.typeOfUser = "user";
      next();
    } else {
      const err = new Error("Invalid email or password");
      next(err);
    }
  }
};

const generateJWT = async (req, res, next) => {
  if (req.typeOfUser === "admin") {
    next();
  } else {
    delete req.user.password;
    const token = authUtils.generateToken(req.user);
    req.token = token;
    next();
  }
};

**Credits**
Throughout the project, we used the help of various online sources to find solutions to problems we faced. To name a few, www.stackoverflow.com, www.geeksforgeeks.com, as well as some GitHub repos such as https://github.com/rwaldron/idiomatic.js/ and https://github.com/airbnb/javascript/tree/master/react

**Contributions**
As for external contributions, it would be much appreciated if anyone is interested to add the feature of specifying the ages of passengers instead of treating them all as adults. For examples having the options of children, infants, etc.


