const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const connectDB = require("./connections/DBConnect");
const AppRoutes = require("./routes");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.use("/api", AppRoutes);

app.listen(port, () => {
  console.log(`App connected to http://localhost:${port}`);
  connectDB();
});
