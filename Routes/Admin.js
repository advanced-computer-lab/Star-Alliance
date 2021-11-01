const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const { flight } = require("../Models/export");

app.get("/", (req, res) => {
  res.json({ message: "welcome admin" });
});

app.get("/GetAllFlights", async (req, res) => {
  console.log("/GetAllFlights sending");

  const result = await flight.find({});

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

module.exports = app;
