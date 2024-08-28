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

// Get a single train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) return res.status(404).json({ message: "Train not found" });
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

  const train = new Train({
    name,
    route,
    currentLocation,
    currentStation,
    startStation,
    endStation,
  });

  try {
    const newTrain = await train.save();
    res.status(201).json(newTrain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a train by ID
exports.updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.status(200).json(train);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a train by ID
exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.status(200).json({ message: "Train deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};