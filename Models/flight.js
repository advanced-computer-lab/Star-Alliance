const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MAX_SEATS = 60;

const flightSchema = new Schema({
  flightNumber: { type: String, unique: true },
  arrivalTime: { type: Date },
  departureTime: { type: Date },
  // Date does include time as well
  // arrivalDate: {type:Date},
  // departureDate: {type:Date},
  economySeatsNum: { type: Number },
  businessSeatsNum: { type: Number },
  firstSeatsNum: { type: Number },
  departureAirport: { type: String },
  arrivalAirport: { type: String },
  firstClassPrice: { type: Number },
  arrivalTerminal: { type: String },
  departureTerminal: { type: Number },
  economyClassPrice: { type: Number },
  businessClassPrice: { type: Number },
  arrivalTerminal: { type: String },
  departureTerminal: { type: String },

  availableSeats: {
    first: { type: [String] },
    business: { type: [String] },
    economy: { type: [String] },
    default: {},
  },
  avaiableSeats: {
    type: [String],
  },
});

flightSchema.pre("save", function (next) {
  var flight = this;
  console.log("This is MONGOOSE");
  if (
    (flight.availableSeats.first.length === 0 && flight.firstSeatsNum !== 0) ||
    (flight.availableSeats.business.length === 0 &&
      flight.businessSeatsNum !== 0) ||
    (flight.availableSeats.economy.length === 0 && flight.economySeatsNum !== 0)
  ) {
    console.log("First Time");
    var firstSeats = [];
    var businessSeats = [];
    var economySeats = [];

    var allSeats = [];
    var ltrs = ["A", "B", "C", "D", "E", "F"];
    var rowsCount = MAX_SEATS / 6;
    for (var j = 1; j <= rowsCount; j++) {
      // col
      for (var i = 0; i < 6; i++) {
        //row
        var lt = ltrs[i];
        var seatStr = `${j}${lt}`;
        allSeats.push(seatStr);
      }
    }

    allSeats.reverse();

    for (var i = 0; i < flight.firstSeatsNum; i++)
      firstSeats.push(allSeats.pop());

    for (var i = 0; i < flight.businessSeatsNum; i++)
      businessSeats.push(allSeats.pop());

    for (var i = 0; i < flight.economySeatsNum; i++)
      economySeats.push(allSeats.pop());

    flight.availableSeats = {
      first: firstSeats,
      business: businessSeats,
      economy: economySeats,
    };
    next();
  } else {
    console.log("Already Created");
    next();
  }
});

module.exports = mongoose.model("Flight", flightSchema);
