const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerOptions");

require("dotenv").config();

const app = express();
const TRAIN_API_PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use train routes
const trainRoutes = require("./routes/trainRoute");
app.use("/api/trains", trainRoutes);

// Use station routes
const stationRoutes = require("./routes/stationRoute");
app.use("/api/stations", stationRoutes);

// Root Route for Testing
app.get("/", (req, res) => {
  res.status(200).json({ message: "Train API Test" });
});

// Start the server
app.listen(TRAIN_API_PORT, () => {
  console.log(`Train API is running on port ${TRAIN_API_PORT}`);
});