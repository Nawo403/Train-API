const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const trainAPI = express();

const TRAIN_API_PORT = 8080;
const MONGO_URI = process.env.MONGO_URI;

trainAPI.use(cors());
trainAPI.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
trainAPI.get("/", (req, res) => {
  res.status(200).json({ message: "Train API Test" });
});

// Start server
trainAPI.listen(TRAIN_API_PORT, () => {
  console.log(`Train API is running on port ${TRAIN_API_PORT}`);
});