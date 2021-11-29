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
  
  const result = await reservation.find({firstName:"yehia"}).populate({path:'flight1'}).populate({path:'user'}).populate({path:'flight2'});
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

  ///

  const Flight2 = new flight();
  Flight2.arrivalAirport=req.body.departureAirport;
  Flight2.departureAirport=req.body.arrivalAirport;
  Flight2.departureTime=req.body.arrivalTime2;
  console.log("flight2",Flight2)


  if(Flight.departureTime!=undefined){
    console.log("test");
var year= new Date(req.body.departureTime).getFullYear();
var month= new Date(req.body.departureTime).getMonth()+1;
var day= new Date(req.body.departureTime).getDate();

if(day<10){
  day="0"+day;
}
if(month<10){
  month="0"+month;
}
var date=year+"-"+month+"-"+day;
//yyyy-MM-DDThh:mm"
var date1=date+"T00:00:00.000Z";
var date2= date+"T23:59:59.000Z";
  }
//
if(Flight2.departureTime!=undefined){
  console.log("flight2depaerture",Flight2.departureTime);

var year2= new Date(Flight2.departureTime).getFullYear();
console.log("flight2depaerture",year2);

var month2= new Date(Flight2.departureTime).getMonth()+1;
console.log("flight2depaerture",Flight2.months2);

var day2= new Date(Flight2.departureTime).getDate();
console.log("flight2depaerture",day2);

if(day2<10){
  day2="0"+day2;
}
if(month2<10){
  month2="0"+month2;
}
var date2=year2+"-"+month2+"-"+day2;
//yyyy-MM-DDThh:mm"
var date3=date2+"T00:00:00.000Z";
var date4= date2+"T23:59:59.000Z";

 //
}
 const type=req.body.type;
 const total=Number(req.body.children)+Number(req.body.adult);
 var result=[]; 
 var result2=[];
 let result3 = [];
 let result4 = [];
 console.log("testttttt",Flight2.departureTime);

 console.log("testttttt",date3);
 console.log("testttt",date4);

if(Flight.departureTime==undefined && Flight2.departureTime!=undefined ){
  if(type=="Economy"){
  
    result = await flight.find({economySeatsNum:{$gte:total},
      arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
  
      result2 = await flight.find({departureTime:{$gte:date3,$lt:date4},economySeatsNum:{$gte:total},
        arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
  
        for(let i=0;i<result.length;i++){
          result3.push({"flightDet":result[i],"finalPrice":result[i].economyClassPrice});
        }
        for(let i=0;i<result2.length;i++){
          result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        }
      }
  else 
  if(type=="First Class"){
    result = await flight.find({firstSeatsNum:{$gte:total},
      arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
  
  
      result2 = await flight.find({departureTime:{$gte:date3,$lt:date4},economySeatsNum:{$gte:total},
        arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
  
        for(let i=0;i<result.length;i++){
          result3[i].flight=result[i];
          result3[i].finalPrice=20;
        }
  
        for(let i=0;i<result2.length;i++){
          result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        }
  
  }
  else
  if (type=="Business"){
    result = await flight.find({businessSeatsNum:{$gte:total},
      arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
  
      result2 = await flight.find({departureTime:{$gte:date3,$lt:date4},economySeatsNum:{$gte:total},
        arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
  
        for(let i=0;i<result.length;i++){
          result3[i].flight=result[i];
          result3[i].finalPrice=10;
        }
  
        for(let i=0;i<result2.length;i++){
          result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        }
      }
}

else
if(Flight.departureTime!=undefined && Flight2.departureTime==undefined ){

  if(type=="Economy"){
  
    result = await flight.find({departureTime:{$gte:date1,$lt:date2},economySeatsNum:{$gte:total},
      arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
  
      result2 = await flight.find({economySeatsNum:{$gte:total},
        arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
  
        for(let i=0;i<result.length;i++){
          result3.push({"flightDet":result[i],"finalPrice":result[i].economyClassPrice});
        }
        for(let i=0;i<result2.length;i++){
          result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        }
      }
  else 
  if(type=="First Class"){
    result = await flight.find({departureTime:{$gte:date1,$lt:date2},firstSeatsNum:{$gte:total},
      arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
  
  
      result2 = await flight.find({economySeatsNum:{$gte:total},
        arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
  
        for(let i=0;i<result.length;i++){
          result3[i].flight=result[i];
          result3[i].finalPrice=20;
        }
  
        for(let i=0;i<result2.length;i++){
          result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        }
  }
  else
  if (type=="Business"){
    result = await flight.find({departureTime:{$gte:date1,$lt:date2},businessSeatsNum:{$gte:total},
      arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
  
      result2 = await flight.find({economySeatsNum:{$gte:total},
        arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
  
        for(let i=0;i<result.length;i++){
          result3[i].flight=result[i];
          result3[i].finalPrice=10;
        }
  
        for(let i=0;i<result2.length;i++){
          result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
        }
      }
  }
  else if(Flight.departureTime==undefined && Flight2.departureTime==undefined) {
    if(type=="Economy"){

  
      result = await flight.find({economySeatsNum:{$gte:total},
        arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
    
        result2 = await flight.find({economySeatsNum:{$gte:total},
          arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
    
          for(let i=0;i<result.length;i++){
            result3.push({"flightDet":result[i],"finalPrice":result[i].economyClassPrice});
          }
          for(let i=0;i<result2.length;i++){
            result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
          }
        }
    else 
    if(type=="First Class"){
      result = await flight.find({firstSeatsNum:{$gte:total},
        arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
    
    
        result2 = await flight.find({economySeatsNum:{$gte:total},
          arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
    
          for(let i=0;i<result.length;i++){
            result3[i].flight=result[i];
            result3[i].finalPrice=20;
          }
    
          for(let i=0;i<result2.length;i++){
            result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
          }
    }
    else
    if (type=="Business"){
      result = await flight.find({businessSeatsNum:{$gte:total},
        arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });
    
        result2 = await flight.find({economySeatsNum:{$gte:total},
          arrivalAirport:Flight2.arrivalAirport, departureAirport:Flight2.departureAirport });
    
          for(let i=0;i<result.length;i++){
            result3[i].flight=result[i];
            result3[i].finalPrice=10;
          }
    
          for(let i=0;i<result2.length;i++){
            result4.push({"flightDet":result2[i],"finalPrice":result2[i].economyClassPrice});
          }
        }
  }
  else if(Flight.departureTime!=undefined && Flight2.departureTime!=undefined){
    
if(type=="Economy"){
  
  result = await flight.find({departureTime:{$gte:date1,$lt:date2},economySeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });

    result2 = await flight.find({departureTime:{$gte:date3,$lt:date4},economySeatsNum:{$gte:total},
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
  result = await flight.find({departureTime:{$gte:date1,$lt:date2},firstSeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });


    result2 = await flight.find({departureTime:{$gte:date3,$lt:date4},economySeatsNum:{$gte:total},
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

}
else
if (type=="Business"){
  result = await flight.find({departureTime:{$gte:date1,$lt:date2},businessSeatsNum:{$gte:total},
    arrivalAirport:Flight.arrivalAirport, departureAirport:Flight.departureAirport });

    result2 = await flight.find({departureTime:{$gte:date3,$lt:date4},economySeatsNum:{$gte:total},
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
    }
  }

 roundtrid={going:result3, returning:result4, seatType:type ,companionsCount:total};
 res.send(roundtrid);
 console.log(roundtrid);

});

module.exports = app;
