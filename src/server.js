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
  payment,
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
const bcrypt = require("bcryptjs");

app.use("/", require("./authServer.js"));
app.use("/Admin", require("../Routes/Admin.js"));
app.use("/User", require("../Routes/User.js"));

const db = require("../Service/DBService.js");

const createUser = async (req, res) => {
  const newUser = new user();
  newUser.firstName = "yehia";
  newUser.lastName = "Mohamed";
  newUser.passportNumber = "3002345678";
  newUser.isAdmin = false;
  newUser.password = await bcrypt.hash("user", 10);
  newUser.email = "starallianceproject@gmail.com";
  newUser.username = "user";
  //const hashedPassword = password, 10);
  await newUser.save();
};
//createUser();
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Flight Reservation" }],
]);

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
  newAd.username = "admin";
  newAd.password = "admin";
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

// app.use(express.static(path.join(__dirname, "build")));
// app.use("/", express.static(path.join(__dirname, "/Client/build")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// ... other app.use middleware
app.use(express.static(path.join(__dirname, "../client", "build")));

// ...

app.get("/a", function (req, res) {
  res.send({ message: "hello" });
});

app.get("/protected", userAuth, (req, res) => {
  console.log("/protected Sending");
  res.json({ message: "You are authenticated" });
});

app.post("/GetRequestedFlights", async (req, res) => {
  console.log("/GetRequestedFlights sending");
  //
  const Flight = new flight();
  Flight.arrivalAirport = req.body.arrivalAirport;
  Flight.departureAirport = req.body.departureAirport;
  Flight.departureTime = req.body.departureTime;

  ///

  const Flight2 = new flight();
  Flight2.arrivalAirport = req.body.departureAirport;
  Flight2.departureAirport = req.body.arrivalAirport;
  Flight2.departureTime = req.body.arrivalTime2;
  console.log("flight2", Flight2);
  let testdte = false;
  if (Flight.departureTime != undefined && Flight2.departureTime != undefined) {
  }
  console.log("testdate  :", testdte);

  if (Flight.departureTime != undefined) {
    console.log("test");
    var year = new Date(req.body.departureTime).getFullYear();
    var month = new Date(req.body.departureTime).getMonth() + 1;
    var day = new Date(req.body.departureTime).getDate();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var date = year + "-" + month + "-" + day;
    //yyyy-MM-DDThh:mm"
    var date1 = date + "T00:00:00.000Z";
    var date2 = date + "T23:59:59.000Z";
  }
  //
  if (Flight2.departureTime != undefined) {
    console.log("flight2depaerture", Flight2.departureTime);

    var year2 = new Date(Flight2.departureTime).getFullYear();
    console.log("flight2depaerture", year2);

    var month2 = new Date(Flight2.departureTime).getMonth() + 1;
    console.log("flight2depaerture", Flight2.months2);

    var day2 = new Date(Flight2.departureTime).getDate();
    console.log("flight2depaerture", day2);

    if (day2 < 10) {
      day2 = "0" + day2;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    var date2 = year2 + "-" + month2 + "-" + day2;
    //yyyy-MM-DDThh:mm"
    var date3 = date2 + "T00:00:00.000Z";
    var date4 = date2 + "T23:59:59.000Z";

    //
  }

  const type = req.body.type;
  const total = Number(req.body.children) + Number(req.body.adult);
  var result = [];
  var result2 = [];
  let result3 = [];
  let result4 = [];
  console.log("testttttt", Flight2.departureTime);

  console.log("testttttt", Flight.departureTime);
  console.log("testttt", Flight2.departureTime);

  if (Flight.departureTime == undefined && Flight2.departureTime != undefined) {
    const typesm = type.toLowerCase();
 
    if (type == "Economy") {
      const checkAvailable = (result = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      }));
      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.economy.length >= total) {
          result.push(checkAvailable[i]);
        }
      }
      const checkAvailable2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.economy.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].economyClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    } else if (type == "First") {
      const checkAvailable = await flight.find({
        firstSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      const checkAvailable2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });
      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.first.length >= total) {
          result.push(checkAvailable[i]);
        }
      }
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.first.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].firstClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].firstClassPrice,
        });
      }
    } else if (type == "Business") {
      const checkAvailable = await flight.find({
        businessSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      const checkAvailable2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.business.length >= total) {
          result.push(checkAvailable[i]);
        }
      }
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.business.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].businessClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].businessClassPrice,
        });
      }
    }
  } else if (
    Flight.departureTime != undefined &&
    Flight2.departureTime == undefined
  ) {

    if (type == "Economy") {
      const checkAvailable = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      const checkAvailable2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.economy.length >= total) {
          result.push(checkAvailable[i]);
        }
      }
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.economy.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].economyClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    } else if (type == "First") {
      const checkAvailable = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        firstSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      const checkAvailable2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.first.length >= total) {
          result.push(checkAvailable[i]);
        }
      }
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.first.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].firstClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].firstClassPrice,
        });
      }
    }
    const checkAvailable = await flight.find({
      departureTime: { $gte: date1, $lt: date2 },
      businessSeatsNum: { $gte: total },
      arrivalAirport: Flight.arrivalAirport,
      departureAirport: Flight.departureAirport,
      [ "availableSeats." + typesm]: { $not: { $size: 0 } },
    });

    const checkAvailable2 = await flight.find({
      departureTime: { $gte: date3, $lt: date4 },
      economySeatsNum: { $gte: total },
      arrivalAirport: Flight2.arrivalAirport,
      departureAirport: Flight2.departureAirport,
      [ "availableSeats." + typesm]: { $not: { $size: 0 } },
    });
    for (let i = 0; i < checkAvailable.length; i++) {
      if (checkAvailable[i].availableSeats.business.length >= total) {
        result.push(checkAvailable[i]);
      }
    }
    for (let i = 0; i < checkAvailable2.length; i++) {
      if (checkAvailable2[i].availableSeats.business.length >= total) {
        result2.push(checkAvailable2[i]);
      }
    }

    for (let i = 0; i < result.length; i++) {
      result3.push({
        flightDet: result[i],
        finalPrice: result[i].businessClassPrice,
      });
    }
    for (let i = 0; i < result2.length; i++) {
      result4.push({
        flightDet: result2[i],
        finalPrice: result2[i].businessClassPrice,
      });
    }
  } else if (
    Flight.departureTime == undefined &&
    Flight2.departureTime == undefined
  ) {
    console.log("type testing", type);

    if (type == "Economy") {
      const checkAvailable = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });
      //console.log("checkAvailable",checkAvailable)

      const checkAvailable2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.economy.length >= total) {
          result.push(checkAvailable[i]);
        }
        console.log("resultAfterUpdate:", result);
      }
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.economy.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].economyClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    } else if (type == "First") {
      const checkAvailable = await flight.find({
        firstSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      const checkAvailable2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.first.length >= total) {
          result.push(checkAvailable[i]);
        }
      }
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.first.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].firstClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].firstClassPrice,
        });
      }
    } else if (type == "Business") {
      const checkAvailable = await flight.find({
        businessSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      const checkAvailable2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
        [ "availableSeats." + typesm]: { $not: { $size: 0 } },
      });

      for (let i = 0; i < checkAvailable.length; i++) {
        if (checkAvailable[i].availableSeats.business.length >= total) {
          result.push(checkAvailable[i]);
        }
      }
      for (let i = 0; i < checkAvailable2.length; i++) {
        if (checkAvailable2[i].availableSeats.business.length >= total) {
          result2.push(checkAvailable2[i]);
        }
      }
      console.log("testing busniness", result);
      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].businessClassPrice,
        });
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].businessClassPrice,
        });
      }
    }
  } else if (
    Flight.departureTime != undefined &&
    Flight2.departureTime != undefined
  ) {
    if (new Date(req.body.departureTime) <= new Date(Flight2.departureTime)) {
      const typesm = type.toLowerCase();
      if (type == "Economy") {
        checkAvailable = await flight.find({
          departureTime: { $gte: date1, $lt: date2 },
          economySeatsNum: { $gte: total },
          arrivalAirport: Flight.arrivalAirport,
          departureAirport: Flight.departureAirport,
          [ "availableSeats." + typesm]: { $not: { $size: 0 } },
        });

        const checkAvailable2 = await flight.find({
          departureTime: { $gte: date3, $lt: date4 },
          economySeatsNum: { $gte: total },
          arrivalAirport: Flight2.arrivalAirport,
          departureAirport: Flight2.departureAirport,
          [ "availableSeats." + typesm]: { $not: { $size: 0 } },
        });
        for (let i = 0; i < checkAvailable.length; i++) {
          if (checkAvailable[i].availableSeats.economy.length >= total) {
            result.push(checkAvailable[i]);
          }
        }
        for (let i = 0; i < checkAvailable2.length; i++) {
          if (checkAvailable2[i].availableSeats.economy.length >= total) {
            result2.push(checkAvailable2[i]);
          }
        }

        for (let i = 0; i < result.length; i++) {
          result3.push({
            flightDet: result[i],
            finalPrice: result[i].economyClassPrice,
          });
        }
        for (let i = 0; i < result2.length; i++) {
          result4.push({
            flightDet: result2[i],
            finalPrice: result2[i].economyClassPrice,
          });
        }
      } else if (type == "First") {
        const checkAvailable = await flight.find({
          departureTime: { $gte: date1, $lt: date2 },
          firstSeatsNum: { $gte: total },
          arrivalAirport: Flight.arrivalAirport,
          departureAirport: Flight.departureAirport,
          [ "availableSeats." + typesm]: { $not: { $size: 0 } },
        });

        const checkAvailable2 = await flight.find({
          departureTime: { $gte: date3, $lt: date4 },
          economySeatsNum: { $gte: total },
          arrivalAirport: Flight2.arrivalAirport,
          departureAirport: Flight2.departureAirport,
          [ "availableSeats." + typesm]: { $not: { $size: 0 } },
        });
        for (let i = 0; i < checkAvailable.length; i++) {
          if (checkAvailable[i].availableSeats.first.length >= total) {
            result.push(checkAvailable[i]);
          }
        }
        for (let i = 0; i < checkAvailable2.length; i++) {
          if (checkAvailable2[i].availableSeats.first.length >= total) {
            result2.push(checkAvailable2[i]);
          }
        }

        for (let i = 0; i < result.length; i++) {
          result3.push({
            flightDet: result[i],
            finalPrice: result[i].firstClassPrice,
          });
        }
        for (let i = 0; i < result2.length; i++) {
          result4.push({
            flightDet: result2[i],
            finalPrice: result2[i].firstClassPrice,
          });
        }
      } else if (type == "Business") {
        const checkAvailable = await flight.find({
          departureTime: { $gte: date1, $lt: date2 },
          businessSeatsNum: { $gte: total },
          arrivalAirport: Flight.arrivalAirport,
          departureAirport: Flight.departureAirport,
          [ "availableSeats." + typesm]: { $not: { $size: 0 } },
        });

        const checkAvailable2 = await flight.find({
          departureTime: { $gte: date3, $lt: date4 },
          economySeatsNum: { $gte: total },
          arrivalAirport: Flight2.arrivalAirport,
          departureAirport: Flight2.departureAirport,
          [ "availableSeats." + typesm]: { $not: { $size: 0 } },
        });
        for (let i = 0; i < checkAvailable.length; i++) {
          if (checkAvailable[i].availableSeats.business.length >= total) {
            result.push(checkAvailable[i]);
          }
        }
        for (let i = 0; i < checkAvailable2.length; i++) {
          if (checkAvailable2[i].availableSeats.business.length >= total) {
            result2.push(checkAvailable2[i]);
          }
        }

        for (let i = 0; i < result.length; i++) {
          result3.push({
            flightDet: result[i],
            finalPrice: result[i].businessClassPrice,
          });
        }
        for (let i = 0; i < result2.length; i++) {
          result4.push({
            flightDet: result2[i],
            finalPrice: result2[i].businessClassPrice,
          });
        }
      }
    }
  }
  var country = "0";
  if (Flight.arrivalAirport == Flight.departureAirport) {
    country = "1";
  }

  roundtrid = {
    going: result3,
    returning: result4,
    seatType: type,
    companionsCount: total,
    CheckCountry: country,
  };
  res.send(roundtrid);
  console.log(roundtrid);
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server at localhost:${port}`));
