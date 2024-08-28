const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    route: {
      type: [String],
      required: true,
    },
    currentLocation: {
      latitude: {
        type: Number,
        required: false,
      },
      longitude: {
        type: Number,
        required: false,
      },
    },
    currentStation: {
      type: String,
      required: true,
    },
    startStation: {
      type: String,
      required: true,
    },
    endStation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;