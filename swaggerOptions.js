const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Train Station API",
      version: "1.0.0",
      description: "API documentation for the Train Station management",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        Station: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the station",
            },
            line: {
              type: "string",
              description: "The line of the station",
            },
            coordinates: {
              type: "array",
              items: {
                type: "number",
              },
              description: "Coordinates of the station",
            },
          },
          required: ["name", "line", "coordinates"],
        },
        Train: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the train",
            },
            route: {
              type: "array",
              items: {
                type: "string",
              },
              description: "List of stations the train passes through",
            },
            currentLocation: {
              type: "object",
              properties: {
                latitude: { type: "number" },
                longitude: { type: "number" },
              },
              description: "Current latitude and longitude of the train",
            },
            currentStation: {
              type: "string",
              description: "Current station of the train",
            },
            startStation: {
              type: "string",
              description: "Start station of the train route",
            },
            endStation: {
              type: "string",
              description: "End station of the train route",
            },
          },
          required: [
            "name",
            "route",
            "currentStation",
            "startStation",
            "endStation",
          ],
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;