const express = require("express");
var path = require("path");
var fs = require("fs"); //file system
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require('mongoose'); 
var cors = require("cors");
require("dotenv").config();


const app = express();
app.use(
  cors({
    origin: process.env.React_Server_Origin,
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


const dbUrl = process.env.DB_URI;
mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.get("/", (req, res) => {
  // console.log(req.cookies);
  res.json({ message: "From the Node Server !" });
});

const handleDbError = (err) => {
  console.log(err);
};

const port = process.env.PORT || 8080;
db.on("error", handleDbError);

app.listen(port, () =>
  console.log(`server is listening at port:${port}`)
);