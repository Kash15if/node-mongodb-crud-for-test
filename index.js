const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//for cors error
const cors = require("cors");
const corsOptions = {
  origin: "*",

  credentials: true,

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"],
};

app.use(cors({ origin: "*" }));



const crudRoutes = require("./routes/crud");
app.use("/crud", crudRoutes);

app.get("/", (req, res) => {

  console.log("ddvdvd");
  res.send([{ x: 1 }, { x: 3 }])

})

app.listen(3000);
