const express = require("express");
const cors = require("cors");

const trainAPI = express();

const TRAIN_API_PORT = 8081;

trainAPI.use(cors());
trainAPI.use(express.json());

trainAPI.get("/", (req, res) => {
  res.status(200).json({ message: "Train API Test" });
});

trainAPI.listen(TRAIN_API_PORT, () => {
  console.log(`Weather API is running on port ${TRAIN_API_PORT}`);
});