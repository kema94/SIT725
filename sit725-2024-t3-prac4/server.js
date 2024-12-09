const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

const MONGO_URI =
  "mongodb+srv://kema94:nxtadmin12345@cluster1.aolkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true });

let projectCollection;

const createCollection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    if (!err) {
      console.log("MDB Connected");
    } else {
      console.log("MDB Error: ", err);
      process.exit(1);
    }
  });
};

const insertCards = (card, callback) => {
  projectCollection.insert(card, callback);
};

const getCards = (callback) => {
  projectCollection.find({}).toArray(callback);
};

app.get("/api/cards", (req, res) => {
  //res.json({ statusCode: 200, message: "Success" });
  getCards((err, result) => {
    if (err) {
      res.json({ status: 400, message: "Failed to fetch cards" });
    } else {
      res.json({ statusCode: 200, data: result, message: "Success" });
    }
  });
});

app.post("/api/cards", (req, res) => {
  let newCard = req.body;
  insertCards(newCard, (err, result) => {
    if (err) {
      res.json({ status: 400, message: "Failed to add card" });
    } else {
      res.json({
        status: 201,
        message: "Successfully created card",
        data: result,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`App connected to http://localhost:${port}`);
  createCollection("dogs");
});
