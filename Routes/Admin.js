const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const { flight,reservation } = require("../Models/export");
var nodemailer = require('nodemailer');
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
  
  const result = await reservation.find({ lastName: "Mohamed"} ).populate({path:'flight'}).populate({path:'user'});
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
  const flightId  = req.body.flightId;
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
  const flightNumber  = req.body.flightNumber;
  console.log("Here is the flight number",flightNumber);
  const result = await flight.deleteOne({flightNumber: flightNumber});
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
}
);
const sendEmail = (userEmail) => {
  const email=process.env.email;
const pass=process.env.pass;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass
  }
});

var mailOptions = {
  from: email,
  to: userEmail,
  subject: 'RESERVATION CANCEL ',
  text: 'Your Reservation is canceled'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
app.post("/CancelReservation", async (req, res) => {
  console.log(req.body.resp);
  const flightNumber  = req.body.flightNumber;
  console.log("Here is the flight number",flightNumber);
  const result1 = await reservation.findOne({flightNumber: flightNumber},{ firstName: "yehia" }).populate({path:'user'});
  const result = await reservation.deleteOne({flightNumber: flightNumber}).populate({path:'user'});
  console.log(result1);
  console.log(result1.user.email);
  //console.log(result1[0].email);
  sendEmail(result1.user.email);
  console.log("result from Delete reservation", result);
  if (result == null) {
    res.status(404).send("No Reservation with this Number");
    return;
  }
  res.send(result);
}
);

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
 Flight.arrivalAirport=req.body.arrivalAirport;
 Flight.departureAirport=req.body.departureAirport;
 Flight.departureTime=req.body.departureTime;
 //
 const Flight2 = new flight();
 Flight2.arrivalAirport=req.body.departureAirport;
 Flight2.departureAirport=req.body.arrivalAirport;
 Flight2.departureTime=req.body.arrivalTime2;

 console.log("testing",req.body.departureTime)
//


 const type=req.body.type;
 const total=Number(req.body.children)+Number(req.body.adult);
 var result=[]; 
 var result2=[];
 let result3 = [];
 let result4 = [];
 // economySeatsNum:{ $gte: total}
if(type=="Economy"){
  
  result = await flight.find({departureTime:Flight.departureTime,economySeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });

    result2 = await flight.find({departureTime:Flight2.departureTime,economySeatsNum:{$gte:total},
      arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });

      for(let i=0;i<result.length;i++){
        result3.push({"flightDet":result[i],"finalPrice":result[i].economyClassPrice});
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh",result3[i]);
      }
      for(let i=0;i<result2.length;i++){
        result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh",result4[i]);
      }
      
      /* result.map((flight) => {
        //let finalPrice=0; 
           flight.finalPrice=flight.economyClassPrice;
       });
       result2.map((flight2) => {
        //let finalPrice=0;
           flight2.finalPrice=flight2.economyClassPrice;
       }); */
    }
else 
if(type=="First Class"){
  result = await flight.find({departureTime:Flight.departureTime,firstSeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });


    result2 = await flight.find({departureTime:Flight2.departureTime,economySeatsNum:{$gte:total},
      arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });

      for(let i=0;i<result.length;i++){
        result3[i].flight=result[i];
        result3[i].finalPrice=20;
        console.log("Here in the for eachhhhhhhhh",result3[i]);
      }

      for(let i=0;i<result2.length;i++){
        result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh",result4[i]);
      }
      /* result.map((flight) => {
        //let finalPrice=0;
        
           flight.finalPrice=flight.firstClassPrice;
           console.log("Here in the for eachhhhhhhhh",flight);
       });
       result2.map((flight2) => {
        //let finalPrice=0;
           flight2.finalPrice=flight2.firstClassPrice;
       }); */

}
else
if (type=="Business"){
  result = await flight.find({departureTime:Flight.departureTime,businessSeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });

    result2 = await flight.find({departureTime:Flight2.departureTime,economySeatsNum:{$gte:total},
      arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });

      for(let i=0;i<result.length;i++){
        result3[i].flight=result[i];
        result3[i].finalPrice=10;
        console.log("Here in the for eachhhhhhhhh",result3[i]);
      }

      for(let i=0;i<result2.length;i++){
        result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        //result3[i].finalPrice=30;
        console.log("Here in the for eachhhhhhhhh",result4[i]);
      }
      /* result.map((flight) => {
        //let finalPrice=0;
           flight.finalPrice=flight.businessClassPrice;
           console.log("Here in the for eachhhhhhhhh",flight);
       });
       result2.map((flight2) => {
        //let finalPrice=0;
           flight2.finalPrice=flight2.businessClassPrice;
       }); */
    }
    //console.log(result3);
 roundtrid={going:result3, returning:result4, seatType:type };
 res.send(roundtrid);
 console.log(roundtrid);

});

module.exports = app;
