const express = require("express");
const router = express.Router();
const { GetAllCards, AddNewCard } = require("../controller/dogController");

router.get("/", (req, res) => {
  GetAllCards()
    .then((result) => {
      if (result) {
        res.json({ statusCode: 200, data: result, message: "Success" });
        return;
      }
      res.json({ status: 400, message: "Failed to fetch cards" });
    })
    .catch((err) => {
      res.json({ status: 400, message: "Failed to fetch cards" });
    });
});

router.post("/", (req, res) => {
  let newCard = req.body;
  AddNewCard(newCard)
    .then((result) => {
      res.json({
        status: 201,
        message: "Successfully created a new card",
        data: result,
      });
    })
    .catch((err) => {
      res.json({ status: 400, message: "Failed to add card", error: err });
    });
});

module.exports = router;
