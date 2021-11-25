const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightNumber: { type: String, unique:true},
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

});
module.exports = mongoose.model("Flight", flightSchema);
