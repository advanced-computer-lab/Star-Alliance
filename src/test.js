// !!! This Flie is just for Quick Testting, And will be Removed later !!!!
var fs = require("fs");
require("dotenv").config();
const sleep = async (milliseconds) => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const moment = require("moment");

const { flight, reservation } = require("../Models/export");

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
  // excute();
  // flight.find({}).then((res) => {
  //   console.log(res);
  // });
  reservation.remove({}).then((res) => {
    console.log(res);
  });
});

// const newUser = new user({});
// newUser.save();

// From	To	Flight Date	Cabin	Seats Available on Flight
//  flightNumber: { type: String, unique:true},
//   arrivalTime: { type: Date },
//   departureTime: { type: Date },
//   // Date does include time as well
//   // arrivalDate: {type:Date},
//   // departureDate: {type:Date},
//   economySeatsNum: { type: Number },
//   businessSeatsNum: { type: Number },
//   firstSeatsNum: { type: Number },
//   departureAirport: { type: String },
//   arrivalAirport: { type: String },
//   firstClassPrice: { type: Number },
//   economyClassPrice: { type: Number },
//   businessClassPrice: { type: Number },
const excute = async () => {
  try {
    var data = fs.readFileSync("../sp1_requirements_db.txt", "utf8");
    const lines = data.toString().replace(/\r\n/g, "\n").split("\n");

    let toBeSent = new flight();
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const values = line.split("\t");
      toBeSent.flightNumber = (i + 1) / 3;
      const formatDate = (input) => moment(input, "DD-MM-YYYY").toDate();
      toBeSent.departureAirport = values[0];
      toBeSent.arrivalAirport = values[1];
      toBeSent.departureTime = formatDate(values[2]);
      switch (values[3]) {
        case "Economy":
          toBeSent.economySeatsNum = Number(values[4]);
          break;
        case "Business":
          toBeSent.businessSeatsNum = Number(values[4]);
          break;
        case "First":
          toBeSent.firstSeatsNum = Number(values[4]);
          break;
      }

      if ((i - 2) % 3 == 0) {
        console.log("sending " + (i + 1) / 3, toBeSent);
        await toBeSent.save();
        await sleep(2000);
        toBeSent = new flight();
      }
      // console.log(values);
    }
  } catch (e) {
    console.log("Error:", e.stack);
  }
};

// excute();

// Delete all flights
// flight.deleteMany({}).then((res) => {
// console.log("res", res);
// });
