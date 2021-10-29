const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companionSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  passportNumber: { type: String, required: true },
  countryCode: { type: String, required: true },
  phoneNumbers: [{ type: String, required: true }],
  birthDate: { type: String, required: true },
});

module.exports = mongoose.model("Companion", companionSchema);
