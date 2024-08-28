const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const trainAPI = express();
const TRAIN_API_PORT = 8080;
const MONGO_URI = process.env.MONGO_URI;

trainAPI.use(cors());
trainAPI.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use train routes
const trainRoutes = require("./routes/trainRoutes");
trainAPI.use("/api/trains", trainRoutes);

// Use station routes
const stationRoutes = require("./routes/stationRoutes");
trainAPI.use("/api/stations", stationRoutes);

trainAPI.get("/", (req, res) => {
  res.status(200).json({ message: "Train API Test" });
});

trainAPI.listen(TRAIN_API_PORT, () => {
  console.log(`Train API is running on port ${TRAIN_API_PORT}`);
});