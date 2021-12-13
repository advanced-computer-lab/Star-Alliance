const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const moment = require("moment");
const { flight, reservation, user } = require("../Models/export");
const jwt = require("jsonwebtoken");
const adminAuth = require("../Middlewares/adminAuth.js");

var nodemailer = require("nodemailer");
const style = "height:'2cm',width:'2cm'";

app.use(adminAuth);

app.get("/", (req, res) => {
  res.json({ message: "welcome admin" });
});

app.get("/GetAllFlights", (req, res) => {
  console.log("/GetAllFlights sending");
  flight
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/GetFlightInfo", async (req, res) => {
  const { flightNumber } = req.body;
  console.log("GetFlightInfo flightnumber =", flightNumber);

  const result = await flight.findOne({ flightNumber: flightNumber });
  console.log("result from GetFlightInfo", result);
  if (result == null) {
    res.status(404).send("No flight with this Number");
    return;
  }
  res.send(result);
});

app.post("/GetInfo", async (req, res) => {
  const flightId = req.body.flightId;
  console.log("GetFlightInfo flightnumber =", req.body.flightId);

  const result = await flight.findOne({ _id: flightId });
  console.log("result from GetFlightInfo", result);
  if (result == null) {
    res.status(404).send("No flight with this Number");
    return;
  }
  res.send(result);
});

app.post("/DeleteFlight", async (req, res) => {
  console.log(req.body.resp);
  const flightNumber = req.body.flightNumber;
  console.log("Here is the flight number", flightNumber);
  const result2 = await flight
    .find({
      flightNumber: req.body.flightNumber,
    })
    .count();

  const result = await flight.deleteOne({ flightNumber: flightNumber });

  //

  //
  if (result2 == 0) {
    res.status(404).send("No flight with this Number");
    return;
  }

  console.log("result from Delete Flight", result);
  res.send(result);
});

app.post("/UpdateFlight", async (req, res) => {
  const data = req.body;
  console.log(data);

  const result = await flight.updateOne(
    { flightNumber: data.findFlightNumber },
    data
  );

  if (result.matchedCount == 0) {
    res.status(404).send("No flight with this Number");
    return;
  }
  if (result.modifiedCount == 0) {
    res.status(400).send("no row has been updated");
    return;
  }
  res.send(result);
});

// TODO: Change Password
app.post("/passcheck", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await user.findOne({ _id: data.findUser });
  if (result.password === data.password) res.send(true);
  else res.send(false);
});
app.post("/Updatepass", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await user.updateOne(
    { _id: data.findUser },
    {
      password: data.password,
    }
  );
  res.send(result);
});
// ------- todo: change password

app.post("/createFlight", async (req, res) => {
  console.log("creating flight");
  //
  const result = await flight
    .find({
      flightNumber: req.body.flightNumber,
    })
    .count();

  //

  if (result == 0) {
    const Flight = new flight();
    //  moment(arrivalTime).format("yyyy-MM-DDThh:mm");

    Flight.flightNumber = req.body.flightNumber;
    Flight.arrivalTime = moment(req.body.arrivalTime).format(
      "yyyy-MM-DDThh:mm"
    );
    Flight.departureTime = moment(req.body.departureTime).format(
      "yyyy-MM-DDThh:mm"
    );
    Flight.economySeatsNum = req.body.economySeatsNum;
    Flight.businessSeatsNum = req.body.businessSeatsNum;
    Flight.departureAirport = req.body.departureAirport;
    Flight.arrivalAirport = req.body.arrivalAirport;
    Flight.firstClassPrice = req.body.firstClassPrice;
    Flight.economyClassPrice = req.body.economyClassPrice;
    Flight.businessClassPrice = req.body.businessClassPrice;
    Flight.firstSeatsNum = req.body.firstSeatsNum;
    Flight.arrivalTerminal = req.body.arrivalTerminal;
    Flight.departureTerminal = req.body.departureTerminal;
    await Flight.save();

    //res.write("<h1>Flight was added successfully</h1>")
    //res.send();
  } else {
    const message =
      "already exist a flight with flight Number  " + req.body.flightNumber;
    res.status(404).send(message);
    return;
  }

  //  setTimeout(function(){
  res.send("http://localhost:3000/");

  //}, 5000);
});

module.exports = app;
