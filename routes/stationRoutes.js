const express = require("express");
const router = express.Router();
const {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description:
 */

/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: Retrieve all stations
 *     tags: [Stations]
 *     responses:
 *       200:
 *         description: List of stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllStations);

/**
 * @swagger
 * /api/stations/{id}:
 *   get:
 *     summary: Retrieve a single station by ID
 *     tags: [Stations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the station to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Station details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getStationById);

/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Create a new station
 *     tags: [Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       201:
 *         description: Station created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       400:
 *         description: Bad request
 */
router.post("/", createStation);

/**
 * @swagger
 * /api/stations/{id}:
 *   put:
 *     summary: Update a station by ID
 *     tags: [Stations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the station to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       200:
 *         description: Station updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
 *       400:
 *         description: Bad request
 */
router.put("/:id", updateStation);

/**
 * @swagger
 * /api/stations/{id}:
 *   delete:
 *     summary: Delete a station by ID
 *     tags: [Stations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the station to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Station deleted successfully
 *       404:
 *         description: Station not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteStation);

module.exports = router;
