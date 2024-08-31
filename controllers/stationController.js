const Station = require("../models/stationModel");

// Get all stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new station
exports.createStation = async (req, res) => {
  const { name, line, latitude, longitude } = req.body;

  const station = new Station({
    name,
    line,
    coordinates: [latitude, longitude],
  });

  try {
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a station by ID
exports.updateStation = async (req, res) => {
  try {
    const { name, line, latitude, longitude } = req.body;
    const station = await Station.findById(req.params.id);

    if (!station) return res.status(404).json({ message: "Station not found" });

    // Update the station fields
    station.name = name || station.name;
    station.line = line || station.line;
    station.coordinates = [latitude, longitude] || station.coordinates;

    const updatedStation = await station.save();
    res.status(200).json(updatedStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a station by ID
exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.status(200).json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
