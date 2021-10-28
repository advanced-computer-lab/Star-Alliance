const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flightSchema = new Schema({
    flightNumber: {type:String, required:true},
    arrivalTime: {type:Date, required:true},
    departureTime: {type:Date, required:true},
    arrivalDate: {type:Date, required:true},
    departureDate: {type:Date, required:true},
    economySeatsNum: {type:Number, required:true},
    businessSeatsNum: {type:Number, required:true},
    departureAirport: {type:String, required:true},
    arrivalAirport: {type:String, required:true}
    
});
module.exports = mongoose.model('Flight', flightSchema);