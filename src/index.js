const express = require("express");
var path = require("path");
var fs = require("fs"); //file system
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require('mongoose'); 
var cors = require("cors");
require("dotenv").config();

const User = require('../Models/user.js');
const Reservation = require('../Models/reservation.js');
const Flight = require('../Models/flight.js');
const CreditCard = require('../Models/creditcard.js');
const Companion = require('../Models/companion.js');
const creditcard = require("../Models/creditcard.js");

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


const dbUrl = process.env.DB_URI;
mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const createAdmin = async(req,res) =>{
    const newAd = new User();
    newAd.firstName = "Adminstrator";
    newAd.isAdmin = true;
    await newAd.save();
    //await User.deleteMany();
  };
//createAdmin();

const createCompanion = async(req,res) =>{
/*   const compan = new Companion();
  compan.firstName="Mohamed";
  compan.lastName="Ahmed";
  compan.passportNumber="123456789";
  compan.countryCode="+20";
  compan.phoneNumbers="123456789";
  compan.birthDate=Date.now();
  const fl = new Flight();
  fl.flightNumber = "123456789";*/
  const x = await User.find({firstName:"ahmed"});
  const us = new User();
  us.firstName="ahmed"; 
  const cr = new creditcard();
  cr.number="123456";
  cr.cvv = "123";
  const t = await CreditCard.find({});
  us.creditcards = t;
  const ress = new Reservation();
  ress.user=x[0];
  //ress.flight = fl;
  //ress.companions=compan;
  await ress.save();
}
//createCompanion();

const testdeleteReservation = async(req, res) =>{
  await User.deleteMany({firstName:"ahmed"});
  //await User.findOneAndDelete({firstName:"ahmed"});
}
testdeleteReservation();

app.get("/", (req, res) => {
  // console.log(req.cookies);
  res.json({ message: "From the Node Server !" });
});

const handleDbError = (err) => {
  console.log(err);
};

const port = process.env.PORT || 8080;
db.on("error", handleDbError);

app.listen(port, () =>
  console.log(`server is listening at port:${port}`)
);