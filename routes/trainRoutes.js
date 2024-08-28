const express = require("express");
const router = express.Router();
const {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
  simulateTrainMovement,
} = require("../controllers/trainController");

router.get("/", getAllTrains);
router.get("/:id", getTrainById);
router.post("/", createTrain);
router.put("/:id", updateTrain);
router.delete("/:id", deleteTrain);


module.exports = router;