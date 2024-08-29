const mongoose = require("mongoose");
const Station = require("./models/stationModel");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const sampleStations = [
  { name: "Fort", line: "Main Line", coordinates: [6.9318, 79.9585] },
  { name: "Maradana", line: "Main Line", coordinates: [6.9271, 79.957] },
  { name: "Bambalapitiya", line: "Main Line", coordinates: [6.9211, 79.9514] },
  { name: "Mount Lavinia", line: "Main Line", coordinates: [6.8568, 79.9753] },
  { name: "Galle", line: "Main Line", coordinates: [6.0275, 80.22] },
  { name: "Puttalam", line: "Puttalam Line", coordinates: [8.3353, 79.8328] },
  { name: "Kurunegala", line: "Puttalam Line", coordinates: [7.4828, 80.3503] },
  { name: "Kollupitiya", line: "Coastal Line", coordinates: [6.9269, 79.9524] },
  { name: "Bambalapitiya", line: "Coastal Line", coordinates: [6.92, 79.9496] },
  { name: "Negombo", line: "Coastal Line", coordinates: [7.2095, 79.9659] },
  { name: "Kalutara", line: "Coastal Line", coordinates: [6.5716, 79.965] },
  { name: "Ragama", line: "Kalaniwali Line", coordinates: [7.0187, 79.9868] },
  {
    name: "Kadawatha",
    line: "Kalaniwali Line",
    coordinates: [7.0211, 80.0153],
  },
];

const seedStations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");

    // Clear existing stations
    await Station.deleteMany({});

    // Insert sample stations
    const result = await Station.insertMany(sampleStations);
    console.log("Sample stations added:", result);
  } catch (error) {
    console.error("Error seeding stations:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedStations();