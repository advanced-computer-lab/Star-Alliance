const express = require("express");
const app = express();
const db = require("../Service/DBService.js");
const { flight } = require("../Models/export");

app.get("/", (req, res) => {
  res.json({ message: "welcome admin" });
});
app.get("/a", async (req, res) => {
  // This is Just for Testing, And Will be removed
  new flight({
    flightNumber: 123,
    arrivalTime: "2016-05-18T16:00:00Z",
    departureTime: "2016-05-18T16:00:00Z",
    economySeatsNum: 3,
    businessSeatsNum: 2,
    firstSeatsNum: 1,
    departureAirport: "cairo",
    arrivalAirport: "jedda",
    price: 532,
  }).save();
  res.send("ok");
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
