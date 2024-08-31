const Train = require("../models/trainModel");
const Station = require("../models/stationModel");

// Get all trains
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get train by ID
exports.getTrainById = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await Train.findById(id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new train
exports.createTrain = async (req, res) => {
  const {
    name,
    route,
    currentLocation,
    currentStation,
    startStation,
    endStation,
  } = req.body;
  const newTrain = new Train({
    name,
    route,
    currentLocation,
    currentStation,
    startStation,
    endStation,
  });

  try {
    const savedTrain = await newTrain.save();
    res.status(201).json(savedTrain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update train details
exports.updateTrain = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    route,
    currentLocation,
    currentStation,
    startStation,
    endStation,
  } = req.body;

  try {
    const train = await Train.findById(id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    train.name = name || train.name;
    train.route = route || train.route;
    train.currentLocation = currentLocation || train.currentLocation;
    train.currentStation = currentStation || train.currentStation;
    train.startStation = startStation || train.startStation;
    train.endStation = endStation || train.endStation;

    const updatedTrain = await train.save();
    res.status(200).json(updatedTrain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete train
exports.deleteTrain = async (req, res) => {
  const { id } = req.params;

  try {
    const train = await Train.findById(id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    await train.remove();
    res.status(200).json({ message: "Train deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Simulate train movement along the route
exports.simulateTrainMovement = async (req, res) => {
  const { trainId } = req.params;

  try {
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: "Train not found" });

    // Get all stations on the train's route
    console.log("train : ", train.route);

    // Updated query to find stations by line
    const stations = await Station.find({ line: train.route }).sort({ _id: 1 });

    if (stations.length === 0) {
      return res
        .status(404)
        .json({ message: "No stations found on this route" });
    }

    // Find the starting station index
    const startStationIndex = stations.findIndex(
      (station) => station.name === train.startStation
    );
    if (startStationIndex === -1) {
      return res
        .status(404)
        .json({ message: "Start station not found in the route" });
    }

    let stationIndex = startStationIndex;

    const intervalId = setInterval(async () => {
      if (stationIndex >= stations.length) {
        clearInterval(intervalId); // Stop when the train reaches the end station
        console.log(`Train ${train.name} has reached the final station.`);
        return;
      }

      // Update train's location to the current station's coordinates
      const currentStation = stations[stationIndex];
      train.currentStation = currentStation.name;
      train.currentLocation = {
        latitude: currentStation.coordinates[0],
        longitude: currentStation.coordinates[1],
      };

      await train.save();

      console.log(`Train ${train.name} is now at ${currentStation.name}`);

      stationIndex++; // Move to the next station
    }, 5000); // Update every 5 seconds

    res
      .status(200)
      .json({ message: `Simulation started for train ${train.name}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
