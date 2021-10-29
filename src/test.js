// This Flie is just for Quick Testting, And will be Removed later !

const mongoose = require("mongoose");
const dbUrl = process.env.DB_URI;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// const user = require("../Models/user.js");
// const newUser = new user({});
// newUser.save();
