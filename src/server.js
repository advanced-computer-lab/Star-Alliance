require("dotenv").config();

const express = require("express");
const moment = require("moment");
var path = require("path");
var fs = require("fs"); //file system
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const userAuth = require("../Middlewares/userAuth.js");
const adminAuth = require("../Middlewares/adminAuth.js");

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
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/Admin", require("../Routes/Admin.js"));
app.use("/User", require("../Routes/User.js"));

const db = require("../Service/DBService.js");

const createUser = async (req, res) => {
  const newUser = new user();
  newUser.firstName = "yehia";
  newUser.lastName = "Mohamed";
  newUser.passportNumber = "3002345678";
  newUser.isAdmin = false;
  newUser.password = "user1234";
  newUser.email = "starallianceproject@gmail.com";
  await newUser.save();
};
//createUser();
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Flight Reservation" }],
  
])

app.post('/create-checkout-session', async (req, res) => {
  try {

    /*const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: 'yousefelbon@gmail.com',
    });*/

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      //receipt_email: 'yousefelbon@gmail.com',
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            
            product_data: {
              name: storeItem.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
          
          //confirmation_method: "automatic",
          //receipt_email: "staralliancegucproject@gmail.com",
        }
      }),
      success_url: 'http://localhost:3000/successfulPayment',
      cancel_url: 'https://localhost:3000'
    })
    res.json({url: session.url})
  }catch(e){
    res.status(500).json({ error:e.message})
  }
 
})

const createReservation = async (req, res) => {
  const reserv = new reservation();

  const nUser = await user.find({ firstName: "yehia" });
  reserv.user = nUser[0];
  reserv.flight1 = (await flight.find({ flightNumber: "4" }))[0];
  reserv.flight2 = (await flight.find({ flightNumber: "5" }))[0];
  console.log(nUser);
  await reserv.save();
};
// createReservation();

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

app.get("/protected", adminAuth, (req, res) => {
  res.json({ message: "You are authenticated" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server at localhost:${port}`));
