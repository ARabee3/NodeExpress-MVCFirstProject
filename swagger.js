import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Social Media API",
    description: "API for Users, Posts, and Comments",
  },
  host: "localhost:3000",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "token", // You used 'token' header in verifyToken.js, not 'Authorization'
      in: "header",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
