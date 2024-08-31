const mongoose = require("mongoose");
const Station = require("./models/stationModel");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const sampleStations = [
  // Main Line
  { name: "Colombo Fort", line: "Main Line", coordinates: [6.9344, 79.8481] },
  { name: "Maradana", line: "Main Line", coordinates: [6.9271, 79.8645] },
  { name: "Dematagoda", line: "Main Line", coordinates: [6.9298, 79.8789] },
  { name: "Kelaniya", line: "Main Line", coordinates: [6.9603, 79.9011] },
  { name: "Ragama", line: "Main Line", coordinates: [7.0304, 79.9227] },
  { name: "Gampaha", line: "Main Line", coordinates: [7.0912, 80.0024] },
  { name: "Veyangoda", line: "Main Line", coordinates: [7.1951, 80.0949] },
  { name: "Mirigama", line: "Main Line", coordinates: [7.2468, 80.1719] },
  { name: "Polgahawela", line: "Main Line", coordinates: [7.3311, 80.2989] },
  { name: "Alawwa", line: "Main Line", coordinates: [7.2535, 80.2701] },
  { name: "Ambepussa", line: "Main Line", coordinates: [7.2643, 80.3295] },
  { name: "Mirigama", line: "Main Line", coordinates: [7.3669, 80.2206] },
  { name: "Kurunegala", line: "Main Line", coordinates: [7.4864, 80.3625] },
  { name: "Maho", line: "Main Line", coordinates: [7.8227, 80.3667] },
  { name: "Anuradhapura", line: "Main Line", coordinates: [8.3454, 80.4056] },
  { name: "Medawachchiya", line: "Main Line", coordinates: [8.5728, 80.5059] },
  { name: "Vavuniya", line: "Main Line", coordinates: [8.7511, 80.4975] },
  { name: "Kilinochchi", line: "Main Line", coordinates: [9.3917, 80.3992] },
  { name: "Jaffna", line: "Main Line", coordinates: [9.6615, 80.0204] },
  { name: "Kankesanthurai", line: "Main Line", coordinates: [9.8061, 80.0688] },
  { name: "Matale", line: "Main Line", coordinates: [7.4705, 80.6256] },
  { name: "Hatton", line: "Main Line", coordinates: [6.8910, 80.5963] },
  { name: "Talawakele", line: "Main Line", coordinates: [6.9374, 80.6536] },
  { name: "Nanu Oya", line: "Main Line", coordinates: [6.9693, 80.7697] },
  { name: "Ella", line: "Main Line", coordinates: [6.8662, 81.0460] },
  { name: "Badulla", line: "Main Line", coordinates: [6.9893, 81.0550] },
  { name: "Demodara", line: "Main Line", coordinates: [6.9217, 81.0458] },
  { name: "Kandy", line: "Main Line", coordinates: [7.2906, 80.6337] },
  { name: "Peradeniya", line: "Main Line", coordinates: [7.2716, 80.5962] },
  { name: "Gampola", line: "Main Line", coordinates: [7.1646, 80.5622] },
  { name: "Nawalapitiya", line: "Main Line", coordinates: [7.0432, 80.5151] },
  
  // Puttalam Line
  { name: "Negombo", line: "Puttalam Line", coordinates: [7.2088, 79.8389] },
  { name: "Chilaw", line: "Puttalam Line", coordinates: [7.5759, 79.7962] },
  { name: "Mundal", line: "Puttalam Line", coordinates: [7.7936, 79.7798] },
  { name: "Puttalam", line: "Puttalam Line", coordinates: [8.0336, 79.8269] },
  { name: "Halawatha", line: "Puttalam Line", coordinates: [8.0907, 79.8356] },
  { name: "Mahawewa", line: "Puttalam Line", coordinates: [7.5056, 79.8039] },
  { name: "Wennappuwa", line: "Puttalam Line", coordinates: [7.3836, 79.8333] },
  { name: "Lunuwila", line: "Puttalam Line", coordinates: [7.3929, 79.8222] },
  
  // Coastal Line
  { name: "Colombo Fort", line: "Coastal Line", coordinates: [6.9344, 79.8481] },
  { name: "Kollupitiya", line: "Coastal Line", coordinates: [6.9270, 79.8480] },
  { name: "Bambalapitiya", line: "Coastal Line", coordinates: [6.9049, 79.8534] },
  { name: "Wellawatta", line: "Coastal Line", coordinates: [6.8777, 79.8607] },
  { name: "Dehiwala", line: "Coastal Line", coordinates: [6.8571, 79.8650] },
  { name: "Mount Lavinia", line: "Coastal Line", coordinates: [6.8378, 79.8638] },
  { name: "Moratuwa", line: "Coastal Line", coordinates: [6.7735, 79.8815] },
  { name: "Panadura", line: "Coastal Line", coordinates: [6.7136, 79.9072] },
  { name: "Kalutara South", line: "Coastal Line", coordinates: [6.5852, 79.9610] },
  { name: "Beruwala", line: "Coastal Line", coordinates: [6.4720, 79.9826] },
  { name: "Aluthgama", line: "Coastal Line", coordinates: [6.4215, 79.9958] },
  { name: "Bentota", line: "Coastal Line", coordinates: [6.4225, 79.9956] },
  { name: "Ambalangoda", line: "Coastal Line", coordinates: [6.2357, 80.0576] },
  { name: "Hikkaduwa", line: "Coastal Line", coordinates: [6.1396, 80.1076] },
  { name: "Galle", line: "Coastal Line", coordinates: [6.0327, 80.2170] },
  { name: "Matara", line: "Coastal Line", coordinates: [5.9451, 80.5477] },
  { name: "Unawatuna", line: "Coastal Line", coordinates: [5.9847, 80.2517] },
  { name: "Weligama", line: "Coastal Line", coordinates: [5.9726, 80.4303] },
  { name: "Koggala", line: "Coastal Line", coordinates: [5.9934, 80.3443] }

]

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