const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const { flight, reservation, user } = require("../Models/export");

var nodemailer = require("nodemailer");

app.get("/", (req, res) => {
  res.json({ message: "welcome admin" });
});

app.get("/GetAllFlights", async (req, res) => {
  console.log("/GetAllFlights sending");

  const result = await flight.find({});

  res.send(result);
});
app.get("/GetAllReservedFlights", async (req, res) => {
  console.log("/GetAllReservedFlights sending");

  const result = await reservation
    .find({ firstName: "yehia" })
    .populate({ path: "flight1" })
    .populate({ path: "user" })
    .populate({ path: "flight2" });
  res.send(result);
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
  const result = await flight.deleteOne({ flightNumber: flightNumber });
  console.log("result from Delete Flight", result);
  if (result == null) {
    res.status(404).send("No flight with this Number");
    return;
  }
  /* console.log(req.body);
  if(req.body.redirectTo === "FlightList"){
    res.redirect("http://localhost:3000/FlightList");
  } */
  res.send(result);
});
const sendEmail = (userEmail,result1,Price) => {
  const email = process.env.email;
  const pass = process.env.pass;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });
  console.log("price:",result1);

  var mailOptions = {
    from: email,
    to: userEmail,
    subject: "RESERVATION CANCEL ",
    text:"Dear "+result1.user.firstName+" "+result1.user.lastName+",\n"+
    "Your Reservation: "+result1._id+" is canceled and the total amount refunded is "+Price+" EGP."
    +"\n"+
    "Thank you for Choosing Star-Alliance Airline \n"+
    "Best Regards, \n"
    +"Star-Alliance Team",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
app.post("/CancelReservation", async (req, res) => {
  console.log(req.body.resp);
  const flightNumber = req.body.flightNumber;
  console.log("Here is the flight number", flightNumber);
  
  const result1 = await reservation
    .findOne({ flightNumber: flightNumber }, { firstName: "yehia" })
    .populate({ path: "user" });
    console.log("7aram ya salwa",result1);
    const result3 = await reservation
    .findOne({ _id:result1._id });
  const result = await reservation
    .deleteOne({ flightNumber: flightNumber })
    .populate({ path: "user" });
  console.log(result1);
  console.log("yarab",result3.finalPrice)

  //console.log(result1[0].email);
  sendEmail(result1.user.email,result1,result3.totalPrice);
  console.log("result from Delete reservation", result);
  if (result == null) {
    res.status(404).send("No Reservation with this Number");
    return;
  }
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

  console.log("testttttt", date3);
  console.log("testttt", date4);

  if (Flight.departureTime == undefined && Flight2.departureTime != undefined) {
    if (type == "Economy") {
      result = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

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
    } else if (type == "First Class") {
      result = await flight.find({
        firstSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 20;
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    } else if (type == "Business") {
      result = await flight.find({
        businessSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 10;
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    }
  } else if (
    Flight.departureTime != undefined &&
    Flight2.departureTime == undefined
  ) {
    if (type == "Economy") {
      result = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

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
    } else if (type == "First Class") {
      result = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        firstSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 20;
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    } else if (type == "Business") {
      result = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        businessSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 10;
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    }
  } else if (
    Flight.departureTime == undefined &&
    Flight2.departureTime == undefined
  ) {
    if (type == "Economy") {
      result = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

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
    } else if (type == "First Class") {
      result = await flight.find({
        firstSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 20;
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    } else if (type == "Business") {
      result = await flight.find({
        businessSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 10;
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
      }
    }
  } else if (
    Flight.departureTime != undefined &&
    Flight2.departureTime != undefined
  ) {
    if (type == "Economy") {
      result = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3.push({
          flightDet: result[i],
          finalPrice: result[i].economyClassPrice,
        });
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh", result3[i]);
      }
      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh", result4[i]);
      }

      /* result.map((flight) => {
        //let finalPrice=0; 
           flight.finalPrice=flight.economyClassPrice;
       });
       result2.map((flight2) => {
        //let finalPrice=0;
           flight2.finalPrice=flight2.economyClassPrice;
       }); */
    } else if (type == "First Class") {
      result = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        firstSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 20;
        console.log("Here in the for eachhhhhhhhh", result3[i]);
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh", result4[i]);
      }
    } else if (type == "Business") {
      result = await flight.find({
        departureTime: { $gte: date1, $lt: date2 },
        businessSeatsNum: { $gte: total },
        arrivalAirport: Flight.arrivalAirport,
        departureAirport: Flight.departureAirport,
      });

      result2 = await flight.find({
        departureTime: { $gte: date3, $lt: date4 },
        economySeatsNum: { $gte: total },
        arrivalAirport: Flight2.arrivalAirport,
        departureAirport: Flight2.departureAirport,
      });

      for (let i = 0; i < result.length; i++) {
        result3[i].flight = result[i];
        result3[i].finalPrice = 10;
        console.log("Here in the for eachhhhhhhhh", result3[i]);
      }

      for (let i = 0; i < result2.length; i++) {
        result4.push({
          flightDet: result2[i],
          finalPrice: result2[i].economyClassPrice,
        });
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh", result4[i]);
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

app.post("/AddReservation", async (req, res) => {
  const {
    userId,
    flight1num,
    flight2num,
    seatType,
    flight1seat,
    flight2seat,
    companions,
    totalPrice,
  } = req.body;

  // check that the user exists, and verifiy that the user can make a reservation
  let resUser = null;
  try {
    resUser = await user.findOne({ _id: "61a35fcdfd33ed54997b5271" });
  } catch (e) {
    console.log("error getting the user", e);
    res.status(404).send("User not found");
    return;
  }
  // check that the flight exists, and verify that the flight is available
  let resFlight1 = null;
  let resFlight2 = null;
  try {
    resFlight1 = await flight.findOne({ flightNumber: flight1num });
    resFlight2 = await flight.findOne({ flightNumber: flight2num });
  } catch (e) {
    console.log("error getting the flight, flight might not exist");
    res.status(404).send("Flight not found");
    return;
  }
  let resFlight1EconomySeats = resFlight1.availableSeats.economy;
  let resFlight1FirstSeats = resFlight1.availableSeats.first;
  let resFlight1BusinessSeats = resFlight1.availableSeats.business;
  let resFlight2EconomySeats = resFlight2.availableSeats.economy;
  let resFlight2FirstSeats = resFlight2.availableSeats.first;
  let resFlight2BusinessSeats = resFlight2.availableSeats.business;

  let flight1AvailableSeatsForCabin = null;
  let flight2AvailableSeatsForCabin = null;
  if (seatType == "Economy") {
    flight1AvailableSeatsForCabin = resFlight1EconomySeats;
    flight2AvailableSeatsForCabin = resFlight2EconomySeats;
    // update the flight's available seats for saving the reservation later
    resFlight1EconomySeats = resFlight1EconomySeats.filter(
      (seat) => !flight1seat.includes(seat)
    );
    resFlight2EconomySeats = resFlight2EconomySeats.filter(
      (seat) => !flight2seat.includes(seat)
    );
  } else if (seatType == "First") {
    flight1AvailableSeatsForCabin = resFlight1FirstSeats;
    flight2AvailableSeatsForCabin = resFlight2FirstSeats;
    resFlight1FirstSeats = resFlight1FirstSeats.filter(
      (seat) => !flight1seat.includes(seat)
    );
    resFlight2FirstSeats = resFlight2FirstSeats.filter(
      (seat) => !flight2seat.includes(seat)
    );
  } else if (seatType == "Business") {
    flight1AvailableSeatsForCabin = resFlight1BusinessSeats;
    flight2AvailableSeatsForCabin = resFlight2BusinessSeats;
    resFlight1BusinessSeats = resFlight1BusinessSeats.filter(
      (seat) => !flight1seat.includes(seat)
    );
    resFlight2BusinessSeats = resFlight2BusinessSeats.filter(
      (seat) => !flight2seat.includes(seat)
    );
  } else {
    console.log("Cabin Class error");
    res.status(503).send("Cabin Class Error");
    return;
  }

  if (
    !flight1seat.every((seat) =>
      flight1AvailableSeatsForCabin.includes(seat)
    ) ||
    flight1seat.length == 0
  ) {
    console.log("Seat Number error");
    res.status(503).send("Seat number error");
    return;
  }
  if (
    !flight2seat.every((seat) =>
      flight2AvailableSeatsForCabin.includes(seat)
    ) ||
    flight2seat.length == 0
  ) {
    console.log("Seat Number error");
    res.status(503).send("Seat number error");
    return;
  }

  //update flight seats
  // resFlight1.avaiableSeats = resFlight1.avaiableSeats.filter(
  //   (seat) => !flight1seat.includes(seat)
  // );

  resFlight1.availableSeats = {
    first: resFlight1FirstSeats,
    business: resFlight1BusinessSeats,
    economy: resFlight1EconomySeats,
  };
  resFlight2.availableSeats = {
    first: resFlight2FirstSeats,
    business: resFlight2BusinessSeats,
    economy: resFlight2EconomySeats,
  };

  console.log("resFligh1", resFlight1.availableSeats);
  console.log("resFligh2", resFlight2.availableSeats);

  console.log("saving resFlight1", await resFlight1.save());
  // resFlight2.avaiableSeats = resFlight2.avaiableSeats.filter(
  // (seat) => !flight2seat.includes(seat)
  // );
  await resFlight2.save();

  // "Business", "Economy", "First"

  // TODO: Calculate the price?

  const newReservation = new reservation({
    user: resUser._id,
    flight1: resFlight1._id,
    flight2: resFlight2._id,
    cabinClass: seatType,
    companions: companions,
    totalPrice:totalPrice,
    fligh1seats: flight1seat,
    fligh2seats: flight2seat,
  });
  console.log("new Reservation", newReservation);
  let reservationId = null;
  try {
    reservationId = (await newReservation.save()).id;
  } catch (e) {
    console.log("error saving the reservation");
    res.status(503).send("Error saving the reservation");
    return;
  }
//  roundtrid={going:result3, returning:result4, seatType:type ,
//  companionsCount:total,CheckCountry:country};
//  res.send(roundtrid);
//  console.log(roundtrid);

  res.send({ bookingNumber: reservationId });
});
app.post("/UpdateUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await user.updateOne(
    { _id: data.findUser },
    {
      firstName: data.firstName,
      lastName: data.lastName,
      passportNumber: data.passportNumber,
      email: data.email,
    }
  );
  res.send(result);
});
app.post("/UpdateUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await user.updateOne(
    { _id: data.findUser },
    {
      firstName: data.firstName,
      lastName: data.lastName,
      passportNumber: data.passportNumber,
      email: data.email,
    }
  );
  res.send(result);
});

app.post("/GetUserInfo", async (req, res) => {
  const UserId = req.body.findUser;
  console.log("GetUserInfo =", req.body.findUser);

  const result = await user.findOne({ _id: UserId });
  console.log("result from GetUserInfo", result);
  if (result == null) {
    res.status(404).send("No User with this Number");
    return;
  }
  res.send(result);
});

app.post("/GetUserInfo", async (req, res) => {
  const UserId = req.body.findUser;
  console.log("GetUserInfo =", req.body.findUser);

  const result = await user.findOne({ _id: UserId });
  console.log("result from GetUserInfo", result);
  if (result == null) {
    res.status(404).send("No User with this Number");
    return;
  }
  res.send(result);
});

// AddReservation({
//   userId: "61a35fcdfd33ed54997b5271",
//   flight1num: 489,
//   flight2num: 789,
//   seatType: "Economy",
//   fligh1seat: "1A",
//   fligh2seat: "2B",
// });

module.exports = app;
