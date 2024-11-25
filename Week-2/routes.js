const express = require("express");
const router = express.Router();

const addNumbers = (number1, number2) => {
  return parseInt(number1) + parseInt(number2);
};

const productOfNumbers = (number1, number2) => {
  return parseInt(number1) * parseInt(number2);
};

router.get("/addTwoNumbers", (req, res) => {
  let { number1, number2 } = req.query;

  let result = addNumbers(number1, number2);
  res.json({ status: 200, data: result, message: "success" });
});

router.post("/subtractTwoNumbers", (req, res) => {
  let { number1, number2 } = req.query;

  let result = addNumbers(number1, -number2);
  res.json({ status: 201, data: result, message: "success" });
});

router.put("/multiplyTwoNumbers", (req, res) => {
  let { number1, number2 } = req.query;

  let result = productOfNumbers(number1, number2);
  res.json({ status: 200, data: result, message: "success" });
});

module.exports = router;
