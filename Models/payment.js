const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  //Number or string
  reservationId: { type: String},
  payment_intent: {type: String, unique:true},
  userId: { type: String },
});
module.exports = mongoose.model("Payment", paymentSchema);
