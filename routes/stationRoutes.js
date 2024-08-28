const express = require("express");
const router = express.Router();
const {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");

router.get("/", getAllStations);
router.get("/:id", getStationById);
router.post("/", createStation);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

module.exports = router;