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

/**
 * @swagger
 * tags:
 *   name: Trains
 */

/**
 * @swagger
 * /api/trains:
 *   get:
 *     summary: Retrieve all trains
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: List of trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllTrains);

/**
 * @swagger
 * /api/trains/{id}:
 *   get:
 *     summary: Retrieve a train by ID
 *     tags: [Trains]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the train to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getTrainById);

/**
 * @swagger
 * /api/trains:
 *   post:
 *     summary: Create a new train
 *     tags: [Trains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       201:
 *         description: Train created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       500:
 *         description: Internal server error
 */
router.post("/", createTrain);

/**
 * @swagger
 * /api/trains/{id}:
 *   put:
 *     summary: Update train details by ID
 *     tags: [Trains]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the train to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       200:
 *         description: Train updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateTrain);

/**
 * @swagger
 * /api/trains/{id}:
 *   delete:
 *     summary: Delete a train by ID
 *     tags: [Trains]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the train to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train deleted successfully
 *       404:
 *         description: Train not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteTrain);

/**
 * @swagger
 * /api/trains/simulate/{trainId}:
 *   post:
 *     summary: Simulate train movement along its route
 *     tags: [Trains]
 *     parameters:
 *       - name: trainId
 *         in: path
 *         required: true
 *         description: The ID of the train to simulate movement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Simulation started successfully
 *       404:
 *         description: Train or route not found
 *       500:
 *         description: Internal server error
 */
router.post("/simulate/:trainId", simulateTrainMovement);

module.exports = router;