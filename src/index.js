const express = require("express");
var path = require("path");
var fs = require("fs"); //file system
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

// const user = require("../Models/user.js");
// const reservation = require("../Models/reservation.js");
// const flight = require("../Models/flight.js");
// const creditCard = require("../Models/creditcard.js");
// const companion = require("../Models/companion.js");
const {
  user,
  reservation,
  flight,
  creditCard,
  companion,
} = require("../Models/export");

// Express App Setup
const app = express();
app.use(
  cors({
    origin: process.env.React_Server_Origin,
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/Admin", require("../Routes/Admin.js"));

const db = require("../Service/DBService.js");

const createAdmin = async (req, res) => {
  const newAd = new user();
  newAd.firstName = "Adminstrator";
  newAd.isAdmin = true;
  await newAd.save();
  //await User.deleteMany();
};
//createAdmin();

const createCompanion = async (req, res) => {
  /*   const compan = new Companion();
  compan.firstName="Mohamed";
  compan.lastName="Ahmed";
  compan.passportNumber="123456789";
  compan.countryCode="+20";
  compan.phoneNumbers="123456789";
  compan.birthDate=Date.now();
  const fl = new Flight();
  fl.flightNumber = "123456789";*/
  const x = await user.find({ firstName: "ahmed" });
  const us = new user();
  us.firstName = "ahmed";
  const cr = new creditcard();
  cr.number = "123456";
  cr.cvv = "123";
  const t = await creditCard.find({});
  us.creditcards = t;
  const ress = new reservation();
  ress.user = x[0];
  //ress.flight = fl;
  //ress.companions=compan;
  await ress.save();
};
//createCompanion();

const testdeleteReservation = async (req, res) => {
  await user.deleteMany({ firstName: "ahmed" });
  //await User.findOneAndDelete({firstName:"ahmed"});
};
// testdeleteReservation();

app.get("/", (req, res) => {
  // console.log(req.cookies);
  res.json({ message: "From the Node Server !" });
});

app.post("/createFlight", async(req, res) => {

  const Flight= new flight();
  Flight.flightNumber=req.body.flightNumber;
  Flight.arrivalTime=req.body.arrivalTime;
  Flight.departureTime=req.body.departureTime;
  Flight.economySeatsNum=req.body.economySeatsNum;
  Flight.businessSeatsNum=req.body.businessSeatsNum;
  Flight.departureAirport=req.body.departureAirport;
  Flight.arrivalAirport=req.body.arrivalAirport;
  Flight.firstClassPrice=req.body.firstClassPrice;
  Flight.economyClassPrice=req.body.economyClassPrice;
  Flight.businessClassPrice=req.body.businessClassPrice;
  Flight.firstSeatsNum=req.body.firstSeatsNum;


  await Flight.save();

});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server at localhost:${port}`));
