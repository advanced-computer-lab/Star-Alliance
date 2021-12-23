const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const moment = require("moment");
const { flight, reservation, user } = require("../Models/export");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const userAuth = require("../Middlewares/userAuth.js");

var nodemailer = require("nodemailer");

app.use(userAuth);

app.get("/", (req, res) => {
  res.json({ message: "welcome from user route" });
});

app.post("/GetUserInfo", async (req, res) => {
  const UserId = req.body.findUser;
  console.log("GetUserInfo =", req.body.findUser);

  const result = await user.findOne({ _id: UserId });
  console.log("result from GetUserInfo", result);
  if (result == null) {
    res.status(400).send("No User with this Number");
    return;
  }
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

  await reservation.updateMany({user:data.findUser},{TicketName:data.firstName});
  res.send(result);
});


// TODO: Change Password
app.post("/changePassword", async (req, res) => {
  const { userId, newPassword, oldPassword } = req.body;
  const targetUser = await user.findOne({ _id: userId });
  if (!targetUser) return res.status(400).send("No User with this Number");

  if (!bcrypt.compareSync(oldPassword, targetUser.password)) {
    console.log("wrong password in change password");
    return res.status(400).send("Wrong Password");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const result = await user.updateOne(
    { _id: userId },
    {
      password: hashedNewPassword,
    }
  );
  console.log(result);
  res.sendStatus(200);
});
// ------- todo: change password

app.post("/GetAllReservedFlights", async (req, res) => {
  const data = req.body;
  console.log("dataaaa", data);
  console.log("/GetAllReservedFlights sending");
  const result = await reservation
    .find({ user: { _id: data.id } })
    .populate({ path: "user" })
    .populate({ path: "flight1" })
    .populate({ path: "flight2" });
  //console.log("/GetAllReservedFlights result", result);
  console.log("user1111111111111", result);
  res.send(result);
});
app.post("/GetAllChildReservedFlights", async (req, res) => {
   const data = req.body;
   console.log("dataaaa", data);
   console.log("/GetAllChildReservedFlights sending");
   const result = await reservation
     .find({ user: { _id: data.id } })
     .populate({ path: "user" })
     .populate({ path: "flight1" })
     .populate({ path: "flight2" });
//   //console.log("/GetAllReservedFlights result", result);
let result2=[];
for(let i=0;i<result.length;i++){
  if(result[i].companions.childCount>0){
    result2.push(result[i]);
  }
}
   console.log("user1111111111111", result);
   res.send(result2);
 });

async function cancel(resId, which) {
  const result8 = await reservation.findById({ _id: resId });
  let flightNumber1 = 0;
  let flightNumberseat1 = 0;
  if (which == "flight1") {
    flightNumber1 = result8.flight1;
    flightNumberseat1 = result8.fligh1seats;
  } else {
    flightNumber1 = result8.flight2;
    flightNumberseat1 = result8.fligh2seats;
  }

  //const flightNumberseat2 = result8.fligh2seats;
  const cabinType = result8.cabinClass.toLowerCase();

  console.log("flightNumber1id", flightNumber1);
  console.log("cabinType", cabinType);

  const getSeats1 = await flight.findByIdAndUpdate({ _id: flightNumber1 });
  const seats1 = getSeats1.availableSeats;
  if (cabinType === "economy") {
    const seats1 = getSeats1.availableSeats;
    flightNumberseat1.forEach((seat) => {
      seats1.economy.push(seat);
    });
  } else if (cabinType === "business") {
    const seats1 = getSeats1.availableSeats;
    flightNumberseat1.forEach((seat) => {
      seats1.business.push(seat);
    });
  } else if (cabinType === "first") {
    const seats1 = getSeats1.availableSeats;
    flightNumberseat1.forEach((seat) => {
      seats1.first.push(seat);
    });
  }
  console.log("seats1", seats1);
  const updateSeats1 = await flight.findByIdAndUpdate(
    { _id: flightNumber1 },
    { availableSeats: seats1 }
  );

  console.log("updateSeats1", updateSeats1);
}
const sendEmail2 = (resUser, data) => {
  const email = process.env.email;
  const pass = process.env.pass;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });
  

  var mailOptions = {
    from: email,
    to: resUser.email,
    subject: "RESERVATION SUMMARY ",

    text:
    "Dear " +
    resUser.firstName +
    " " +
    resUser.lastName +
      ",\n" +
      "Your Reservation: " +
      data.reservationID +
      "\n"+
      "Flight:"+ data.flightNumber+
      "\n"+
      "Departure Airport: " + data.departureAirport +"            " + "Arrival airport: "+ data.arrivalAirport+
      "\n"+
      "Arrival Time: "+data.arrivalTime +"            "+"Departure Time: "+ data.departureTime +
      "\n"+
       "seat: "+ data.seatNum +
       "\n"+
       "Cabin: "+ data.cabin +
      "\n" +
      "Thank you for Choosing Star-Alliance Airline \n" +
      "Best Regards, \n" +
      "Star-Alliance Team",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
app.post("/sendEmail", async (req, res) => {
  console.log("sdddaaasdsd",req.body);
  const data = req.body;
  resUser = await user.findOne({ _id: data.id });
  sendEmail2(resUser,data);
  console.log("flight det",data)
  console.log("usermail",resUser)
  console.log("userid",data.id)
 // res.send();
});
app.post("/CreateCheckoutSession", async (req, res) => {

    /*const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: 'yousefelbon@gmail.com',
    });*/
    const storeItems = new Map([
      [1, { priceInCents: 10000, name: "Flight Reservation" }],
      
    ])
    console.log("Debugging req bodyyyyyyyyyyyy",req.body);
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
      cancel_url: 'https://localhost:3000/FailurePayment'
    })
    console.log("payment returnnnnn", session);
    //const newPayment = new payment();
    //newPayment.
    res.json({url: session.url, paymentId:session.id})
 
    //res.status(500).json({ error:e.message})
 
});

app.post('/RefundCheckoutSession', async (req, res) => {
  console.log(req.body);
  const refund = await stripe.refunds.create({
    charge: 'ch_3K9EJ52eZvKYlo2C1UV2vBjr',
    amount: 100
  });
  });

app.post("/AddEditReservation", async (req, res) => {
  const {
    userId,
    flight1num,
    flight2Id,
    seatType,
    flight1seat,
    flight2seat,
    companions,
    resId,
    which,
  } = req.body;
  console.log("printing request.body", req.body);
  // resFlight2 = await flight.findOne({ _id: flight2Id });
  // check that the user exists, and verifiy that the user can make a reservation
  let resUser = null;
  try {
    resUser = await user.findOne({ _id: userId });
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
    resFlight2 = await flight.findOne({ _id: flight2Id });
  } catch (e) {
    console.log("error getting the flight, flight might not exist");
    res.status(404).send("Flight not found");
    return;
  }
  cancel(resId, which);

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
    const errorMsg =
      "SeatType is not valid, expecting: Economy, First, Business; got " +
      seatType;
    console.log(errorMsg);
    res.status(503).send(errorMsg);
    return;
  }

  // if (
  //   !flight1seat.every((seat) =>
  //     flight1AvailableSeatsForCabin.includes(seat)
  //   ) ||
  //   flight1seat.length == 0
  // ) {
  //   console.log("Seat Number error");
  //   res.status(503).send("Seat number error");
  //   return;
  // }
  // Make sure flight1 seating count is equal to flight2 seating count
  // if (flight1seat.length != flight2seat.length) {
  //   const errMsg = `Seat Number error, flight1seats != flight2seats, f1s=${flight1seat} f2s=${flight2seat}`;
  //   console.log(errMsg);
  //   res.status(503).send(errMsg);
  //   return;
  // }

  // // Make sure companios count matches seating count
  // if (companions.adultCount + companions.childCount != flight1seat.length) {
  //   const errMsg = `Seat Number error, companions != flight1seats, companions=${JSON.stringify(
  //     companions
  //   )} flight1seats=${flight1seat}`;
  //   console.log(errMsg);
  //   res.status(503).send(errMsg);
  //   return;
  // }

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

  await resFlight1.save();
  await resFlight2.save();

  // Calculate total price
  // firstClassPrice, economyClassPrice, businessClassPrice
  const classPrice = seatType.toLowerCase() + "ClassPrice";
  const classPriceFlight1 = resFlight1[classPrice];
  const classPriceFlight2 = resFlight2[classPrice];
  if (classPriceFlight1 == null || classPriceFlight2 == null) {
    const errorMsg =
      "Invalid class price, expecting: First, Business, Economy; got " +
      classPrice;
    console.log(errorMsg);
    res.status(503).send(errorMsg);
    return;
  }
  const flight1totalPrice =
    companions.adultCount * classPriceFlight1 +
    companions.childCount * (0.5 * classPriceFlight1);
  const flight2totalPrice =
    companions.adultCount * classPriceFlight2 +
    companions.childCount * (0.5 * classPriceFlight2);
  const totalPrice = flight1totalPrice + flight2totalPrice;

  const newReservation = new reservation({
    user: resUser._id,
    flight1: resFlight1._id,
    flight2: resFlight2._id,
    cabinClass: seatType,
    companions: companions,
    totalPrice: totalPrice,
    fligh1seats: flight1seat,
    fligh2seats: flight2seat,
    flight1Price: flight1totalPrice,
    flight2Price: flight2totalPrice
  });
  console.log("newwwwwwcheck,", newReservation);
  //resId
  if (which == "flight1") {
    await reservation.updateOne(
      { _id: resId },
      {
        flight1: resFlight1._id,
        cabinClass: seatType,
        totalPrice: totalPrice,
        fligh1seats: flight1seat,
      }
    );
    //
  } else {
    await reservation.updateOne(
      { _id: resId },
      {
        flight2: resFlight1._id,
        cabinClass: seatType,
        totalPrice: totalPrice,
        fligh2seats: flight1seat,
      }
    );
  }
  console.log("new Reservation", newReservation);
  let reservationId = null;
  try {
    //reservationId = (await newReservation.save()).id;
  } catch (e) {
    console.log("error saving the reservation");
    res.status(503).send("Error saving the reservation");
    return;
  }
  //  roundtrid={going:result3, returning:result4, seatType:type ,
  //  companionsCount:total,CheckCountry:country};
  //  res.send(roundtrid);
  //  console.log(roundtrid);

  res.send({ bookingNumber: resId });
});
const sendEmail1 = (newReservation,resUser, resFlight1, resFlight2) => {
  const email = process.env.email;
  const pass = process.env.pass;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });
  

  var mailOptions = {
    from: email,
    to: resUser.email,
    subject: "RESERVATION SUMMARY ",

    text:
      "Dear " +
      resUser.firstName +
      " " +
      resUser.lastName +
      ",\n" +
      "Your Reservation: " +
      newReservation._id +
      "\n"+
      "Going Flight:"+
      "\n"+
      "Departure Airport: " + resFlight1.departureAirport +"            " + "Arrival airport"+ resFlight1.arrivalAirport+
      "\n"+
      "Arrival Time: "+resFlight1.arrivalTime +"            "+"Departure Time: "+ resFlight1.departureTime +
      "\n"+
       "seat: "+ newReservation.fligh1seats +
       "\n"+
       "Cabin: "+ newReservation.cabinClass +
      "\n" +
      "Returning Flight:"+
      "\n"+
      "Departure Airport: " + resFlight2.departureAirport +"            " + "Arrival airport: "+ resFlight2.arrivalAirport+
      "\n"+
      "Arrival Time: "+resFlight2.arrivalTime +"            "+"Departure Time: "+ resFlight2.departureTime +
      "\n"+
       "seat: "+ newReservation.fligh2seats +
       "\n"+
       "Cabin: "+ newReservation.cabinClass +
      "\n" +
      "Total Price: "+ newReservation.totalPrice+
      "\n" +
      "Thank you for Choosing Star-Alliance Airline \n" +
      "Best Regards, \n" +
      "Star-Alliance Team",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
app.post("/AddReservation", async (req, res) => {
  const {
    userId,
    flight1num,
    flight2num,
    seatType,
    flight1seat,
    flight2seat,
    companions,
    companionNames,
  } = req.body;
  console.log("----------------------------------------------------------");
  console.log("----------------------------------------------------------");
console.log("req.body testing companions",req.body);
console.log("----------------------------------------------------------");
console.log("----------------------------------------------------------");
let x=companions.childCount;
  // check that the user exists, and verifiy that the user can make a reservation
  let resUser = null;
  try {
    resUser = await user.findOne({ _id: userId });
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
    const errorMsg =
      "SeatType is not valid, expecting: Economy, First, Business; got " +
      seatType;
    console.log(errorMsg);
    res.status(503).send(errorMsg);
    return;
  }

  // if (
  //   !flight1seat.every((seat) =>
  //     flight1AvailableSeatsForCabin.includes(seat)
  //   ) ||
  //   flight1seat.length == 0
  // ) {
  //   console.log("Seat Number error");
  //   res.status(503).send("Seat number error");
  //   return;
  // }
  // if (
  //   !flight2seat.every((seat) =>
  //     flight2AvailableSeatsForCabin.includes(seat)
  //   ) ||
  //   flight2seat.length == 0
  // ) {
  //   console.log("Seat Number error");
  //   res.status(503).send("Seat number error");
  //   return;
  // }

  // Make sure flight1 seating count is equal to flight2 seating count
  // if (flight1seat.length != flight2seat.length) {
  //   const errMsg = `Seat Number error, flight1seats != flight2seats, f1s=${flight1seat} f2s=${flight2seat}`;
  //   console.log(errMsg);
  //   res.status(503).send(errMsg);
  //   return;
  // }

  // Make sure companios count matches seating count
  // if (companions.adultCount + companions.childCount != flight1seat.length) {
  //   const errMsg = `Seat Number error, companions != flight1seats, companions=${JSON.stringify(
  //     companions
  //   )} flight1seats=${flight1seat}`;
  //   console.log(errMsg);
  //   res.status(503).send(errMsg);
  //   return;
  // }

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

  await resFlight1.save();
  // resFlight2.avaiableSeats = resFlight2.avaiableSeats.filter(
  // (seat) => !flight2seat.includes(seat)
  // );
  await resFlight2.save();

  // Calculate total price
  // firstClassPrice, economyClassPrice, businessClassPrice
  const classPrice = seatType.toLowerCase() + "ClassPrice";
  const classPriceFlight1 = resFlight1[classPrice];
  const classPriceFlight2 = resFlight2[classPrice];
  if (classPriceFlight1 == null || classPriceFlight2 == null) {
    const errorMsg =
      "Invalid class price, expecting: First, Business, Economy; got " +
      classPrice;
    console.log(errorMsg);
    res.status(503).send(errorMsg);
    return;
  }
  const flight1totalPrice =
    companions.adultCount * classPriceFlight1 +
    companions.childCount * (0.5 * classPriceFlight1);
  const flight2totalPrice =
    companions.adultCount * classPriceFlight2 +
    companions.childCount * (0.5 * classPriceFlight2);
  const totalPrice = flight1totalPrice + flight2totalPrice;
  let totalPeople = companions.adultCount;
  let i = 0;
  let whatToReturn = "";
  let allSeats1 = [];
  let allSeats2 = [];
  console.log("----------------------------------------------------------");

  console.log("fligh1seat", flight1seat);
  console.log("fligh2seat", flight2seat);
  console.log("count",companions.childCount )
  console.log("----------------------------------------------------------");

  if (companions.childCount > 0) {
    let j = 0;
    for (j = 0; j < companions.childCount; j++) {
      if (j == 0) {
        allSeats1.push(flight1seat[0]);
        allSeats2.push(flight2seat[0]);
      }
      allSeats1.push(flight1seat[flight1seat.length - 1]);
      allSeats2.push(flight2seat[flight2seat.length - 1]);
      flight1seat.pop();
      flight2seat.pop();
      //console.log("allSeats1",allSeats1);
      //console.log("allSeats1",flight1seat);
    }
  }
  if (companions.childCount == 0) {
    allSeats1.push(flight1seat[0]);
    allSeats2.push(flight2seat[0]);
  }
  console.log("fligh1seat", flight1seat);
  console.log("fligh2seat", flight2seat);
  console.log("----------------------------------------------------------");

  companions.adultCount=1;
  //companions.childCount=x;

  //let userWithChild=companions;
  //userWithChild.childCount=x;
  //userWithChild.ad
  let notUser={adultCount:1,childCount:0};


  for(i;i<totalPeople;i++){
    if(i>0){
    const newReservation = new reservation({
      user: resUser._id,
      flight1: resFlight1._id,
      flight2: resFlight2._id,
      cabinClass: seatType,
      companions: notUser,
      totalPrice: classPriceFlight1+classPriceFlight2,
      fligh1seats: flight1seat[i],
      fligh2seats: flight2seat[i],
      isCompanion:true,
      TicketName:companionNames[i-1],
      flight1totalPrice: classPriceFlight1,
      flight2totalPrice: classPriceFlight2,

    });
    console.log("new Reservation", newReservation);
    let reservationId = null;
    try {
      reservationId = (await newReservation.save()).id;
      sendEmail1(newReservation,resUser, resFlight1, resFlight2);
    } catch (e) {
      console.log("error saving the reservation");
      res.status(503).send("Error saving the reservation");
      return;
    }
    }
  else{
    const newReservation = new reservation({
      user: resUser._id,
      flight1: resFlight1._id,
      flight2: resFlight2._id,
      cabinClass: seatType,
      companions: companions,
      totalPrice: classPriceFlight1+classPriceFlight2+companions.childCount 
      * (0.5 * classPriceFlight1)+companions.childCount * (0.5 * classPriceFlight2),
      fligh1seats: allSeats1,
      fligh2seats: allSeats2,
      isCompanion:false,
      TicketName:resUser.firstName,
      flight1totalPrice: classPriceFlight1+companions.childCount * (0.5 * classPriceFlight1),
      flight2totalPrice: classPriceFlight2+companions.childCount * (0.5 * classPriceFlight2),

    
    });
    console.log("new Reservation", newReservation);
    let reservationId = null;
    try {
      reservationId = (await newReservation.save()).id;
      sendEmail1(newReservation,resUser, resFlight1, resFlight2);
      whatToReturn=reservationId;
    } catch (e) {
      console.log("error saving the reservation");
      res.status(503).send("Error saving the reservation");
      return;
    }
  }
  
  res.send({ bookingNumber: whatToReturn });
}
});

const sendEmail = (userEmail, result1, Price) => {
  const email = process.env.email;
  const pass = process.env.pass;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });
  console.log("price:", result1);

  var mailOptions = {
    from: email,
    to: userEmail,
    subject: "RESERVATION CANCEL ",

    text:
      "Dear " +
      result1.user.firstName +
      " " +
      result1.user.lastName +
      ",\n" +
      "Your Reservation: " +
      result1._id +
      " is canceled and the total amount refunded is " +
      Price +
      " $." +
      "\n" +
      "Thank you for Choosing Star-Alliance Airline \n" +
      "Best Regards, \n" +
      "Star-Alliance Team",
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
  console.log("--------------------------at backend");
  const flightNumber = req.body.flightNumber;
  console.log("Here is the flight number", flightNumber);

  const result1 = await reservation.findOne({ _id: req.body.reservation }); //To be changed
  const result8 = await reservation.findById({ _id: result1._id });
  console.log("test flight1", result8);
  const flightNumber1 = result8.flight1;
  const flightNumber2 = result8.flight2;
  console.log("result8", result8);
  const cabinType = result8.cabinClass.toLowerCase();
  console.log("flightNumber1id", flightNumber1);
  console.log("flightNumber2id", flightNumber2);
  console.log("cabinType", cabinType);
  const flightNumberseat1 = result8.fligh1seats;
  const flightNumberseat2 = result8.fligh2seats;
  const getSeats1 = await flight.findByIdAndUpdate({ _id: flightNumber1 });
  const getSeats2 = await flight.findByIdAndUpdate({ _id: flightNumber2 });
  const seats1 = getSeats1.availableSeats;
  const seats2 = getSeats2.availableSeats;
  if(result8.companions!=undefined){
  if(result8.companions.childCount>0){
    const result9 = await reservation.findOne({ user:result8.user,flight1:flightNumber1,
      flight2:flightNumber2,isCompanion:true });
      if(result9!=undefined){
      const childSeat1=flightNumberseat1[flightNumberseat1.length-1];
      const  childSeat2=flightNumberseat2[flightNumberseat2.length-1];
      flightNumberseat1.pop();
      flightNumberseat2.pop();

      const seats3= result9.fligh1seats;
      seats3.push(childSeat1);

      const seats4= result9.fligh2seats;
      seats4.push(childSeat2);
      const addCildCompanion={adultCount:1,childCount:result8.companions.childCount};
      console.log("----------------------");
      console.log("result9._id",result9._id)
      console.log("----------------------");
      const updateSeats1 = await reservation.updateOne(
        { _id: result9._id},

        {$set:{ companions: addCildCompanion,totalPrice:result9.totalPrice+
          result9.totalPrice*result8.companions.childCount*0.5,fligh1seats:seats3,
          fligh2seats:seats4,
          flight1totalPrice: result9.flight1totalPrice+0.5*(result9.flight1totalPrice)*result8.companions.childCount,
          flight2totalPrice: result9.flight2totalPrice+0.5*(result9.flight2totalPrice)*result8.companions.childCount}}
          
      );
      }
    }
  }
  if (cabinType === "economy") {
    const seats1 = getSeats1.availableSeats;
    const seats2 = getSeats2.availableSeats;
    flightNumberseat1.forEach((seat) => {
      seats1.economy.push(seat);
    });
    flightNumberseat2.forEach((seat) => {
      seats2.economy.push(seat);
    });
  } else if (cabinType === "business") {
    const seats1 = getSeats1.availableSeats;
    const seats2 = getSeats2.availableSeats;
    flightNumberseat1.forEach((seat) => {
      seats1.business.push(seat);
    });
    flightNumberseat2.forEach((seat) => {
      seats2.business.push(seat);
    });
  } else if (cabinType === "first") {
    const seats1 = getSeats1.availableSeats;
    const seats2 = getSeats2.availableSeats;
    flightNumberseat1.forEach((seat) => {
      seats1.first.push(seat);
    });
    flightNumberseat2.forEach((seat) => {
      seats2.first.push(seat);
    });
  }
  console.log("seats1", seats1);
  console.log("seats2", seats2);
  const updateSeats1 = await flight.findByIdAndUpdate(
    { _id: flightNumber1 },
    { availableSeats: seats1 }
  );
  const updateSeats2 = await flight.findByIdAndUpdate(
    { _id: flightNumber2 },
    { availableSeats: seats2 }
  );
  console.log("updateSeats1", updateSeats1);
  console.log("updateSeats2", updateSeats2);
  console.log();

  console.log("test1", result1);
  const result3 = await reservation.findOne({ _id: result1._id });
  const result = await reservation
    .deleteOne({ flightNumber: flightNumber })
    .populate({ path: "user" });
  console.log(result1);
  console.log("test12", result3.finalPrice);

  //console.log(result1[0].email);
  sendEmail(result1.user.email, result1, result3.totalPrice);
  console.log("result from Delete reservation", result);
  if (result == null) {
    res.status(404).send("No Reservation with this Number");
    return;
  }
  res.send(result);
});
app.post("/CancelChildReservation", async (req, res) => {
  const flightNumber = req.body.flightNumber;
  console.log("Here is the flight number", flightNumber);

  const result1 = await reservation
    .findOne({ _id: req.body.reservation}).populate({ path: "user" }) //To be changed
  const result8 = await reservation.findById({ _id: result1._id });
  console.log("test flight1", result8);
  const flightNumber1 = result8.flight1;
  const flightNumber2 = result8.flight2;
  console.log("result8", result8);
  const cabinType = result8.cabinClass.toLowerCase();
  console.log("flightNumber1id", flightNumber1);
  console.log("flightNumber2id", flightNumber2);
  console.log("cabinType", cabinType);
  let seats3= result8.fligh1seats;
  let seats4= result8.fligh2seats;
  const flightNumberseat1 =seats3.pop();
  const flightNumberseat2 =seats4.pop();
  const getSeats1 = await flight.findByIdAndUpdate({ _id: flightNumber1 });
  const getSeats2 = await flight.findByIdAndUpdate({ _id: flightNumber2 });
  const seats1 = getSeats1.availableSeats;
  const seats2 = getSeats2.availableSeats;
  
    
let totalNum= result8.companions.childCount+result8.companions.adultCount;
  
  let newCompanions={adultCount:1,childCount:result8.companions.childCount-1}
      const updateSeats0 = await reservation.updateOne(
        { _id: result8._id},

        {$set:{ companions:newCompanions,totalPrice:result8.totalPrice-(result8.totalPrice*(1/(totalNum+1)))
         ,fligh1seats:seats3,
          fligh2seats:seats4,
          flight1totalPrice:result8.flight1totalPrice-(result8.flight1totalPrice*(1/(totalNum+1))),
          flight2totalPrice:result8.flight2totalPrice-(result8.flight2totalPrice*(1/(totalNum+1)))
         }}
          
      );
     
  
  if (cabinType === "economy") {
    const seats1 = getSeats1.availableSeats;
    const seats2 = getSeats2.availableSeats;
      seats1.economy.push(flightNumberseat1);
      seats2.economy.push(flightNumberseat2);
  } else if (cabinType === "business") {
    const seats1 = getSeats1.availableSeats;
    const seats2 = getSeats2.availableSeats;
    seats1.economy.push(flightNumberseat1);
    seats2.economy.push(flightNumberseat2);
  } else if (cabinType === "first") {
    const seats1 = getSeats1.availableSeats;
    const seats2 = getSeats2.availableSeats;
    seats1.economy.push(flightNumberseat1);
    seats2.economy.push(flightNumberseat2);
  }
  console.log("seats1", seats1);
  console.log("seats2", seats2);
  const updateSeats1 = await flight.findByIdAndUpdate(
    { _id: flightNumber1 },
    { availableSeats: seats1 }
  );
  const updateSeats2 = await flight.findByIdAndUpdate(
    { _id: flightNumber2 },
    { availableSeats: seats2 }
  );
  console.log("updateSeats1", updateSeats1);
  console.log("updateSeats2", updateSeats2);
  console.log();
  sendEmail(result1.user.email, result1, result3.totalPrice);
  res.send(updateSeats0) ;


});

app.get("/test", async (req, res) => {
  console.log("user test ");
  console.log(req.user);
  res.send("OKk");
});
module.exports = app;
