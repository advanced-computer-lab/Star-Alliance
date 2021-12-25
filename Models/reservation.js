const mongoose = require("mongoose");
const User = require("./user");
const Flight = require("./flight");
const Companion = require("./companion");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  flight1: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },
  flight2: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },

  companions: Schema.Types.Mixed,

  fligh1seats: { type: [String] },
  fligh2seats: { type: [String] },
  TicketName: { type: String },
  childName:{type:[String]},
  flight1totalPrice: Number,
  flight2totalPrice: Number,

  cabinClass: { type: String, enum: ["Business", "Economy", "First"] },
  baggageAllowance: {
    weight: { type: Number, default: 23 },
    number: { type: Number, default: 2 },
  },
  isCompanion: {
    type: Boolean,
    default: false,
  },
  totalPrice:{
    type: Number,
    default:0,
  }
});

// Reservation Price Calculation, based on number of passengers, cabin class
// Companios for simplicity now, is just the numbers of adults and children
// companions: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "companion",
//   },
// ],

/* 
reservationSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await User.deleteMany({
            _id: {
                $in: doc.users
            }
        })
    }
}); */

module.exports = mongoose.model("Reservation", reservationSchema);
