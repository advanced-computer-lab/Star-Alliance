const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const { flight,reservation } = require("../Models/export");

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
  res.send(result);
}
);
app.post("/CancelReservation", async (req, res) => {
  console.log(req.body.resp);
  const flightNumber  = req.body.flightNumber;
  console.log("Here is the flight number",flightNumber);
  const result = await reservation.deleteOne({flightNumber: flightNumber});
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
//


 const type=req.body.type;
 const total=Number(req.body.children)+Number(req.body.adult);
 var result=[]; 
 var result2=[];


 // economySeatsNum:{ $gte: total}
if(type=="Economy"){
  
  result = await flight.find({departureTime:Flight.departureTime,economySeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });

    result2 = await flight.find({departureTime:Flight2.departureTime,economySeatsNum:{$gte:total},
      arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
}
else 
if(type=="First Class"){
  result = await flight.find({departureTime:Flight.departureTime,firstSeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });

    result2 = await flight.find({departureTime:Flight2.departureTime,economySeatsNum:{$gte:total},
      arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
}
else
if (type=="Business"){
  result = await flight.find({departureTime:Flight.departureTime,businessSeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });

    result2 = await flight.find({departureTime:Flight2.departureTime,economySeatsNum:{$gte:total},
      arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
}
 roundtrid={going:result, returning:result2 };
 res.send(roundtrid);
 console.log(roundtrid);


 
  
});

module.exports = app;
