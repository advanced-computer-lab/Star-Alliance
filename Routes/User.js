const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const moment = require("moment");
const { flight, reservation, user } = require("../Models/export");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var nodemailer = require("nodemailer");

app.get("/", (req, res) => {
  res.json({ message: "welcome from user route" });
});

app.post("/signUp", async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    birthDate,
    country,
    city,
    street,
    buildingNumber,
    passportNumber,
    countryCode,
  } = req.body;

  const address = {
    country: country,
    city: city,
    street: street,
    buildingNumber: buildingNumber,
  };


  
  const hashedPassword = await bcrypt.hash(password, 10);

  const phoneNumbers = [phoneNumber];

  const newUser = new user({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    phoneNumbers,
    birthDate,
    address,
    buildingNumber,
    passportNumber,
    countryCode,
    isAdmin: false,
  });
  try {
    const result = await newUser.save();
    console.log(result);
    res.sendStatus(200);
  } catch (error) {
    const emsg = error.message;
    console.log(emsg);
    if (emsg.includes("duplicate key")) {
      res.status(400).send("Username already exists, choose another one");
    } else res.status(400).send(error.message);
  }
});


module.exports = app;
