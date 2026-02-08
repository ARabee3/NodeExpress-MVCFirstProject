import express from "express";
import { dbConnection } from "./Database/db_connection.js";
import postRouter from "./Modules/post/post.routes.js";
import "dotenv/config";
import userRouter from "./Modules/user/user.routes.js";
import commentRouter from "./Modules/comment/comment.routes.js";
import "./Utils/Events/sendEmailOnRegisterationEvent.js";
import { AppError } from "./Utils/ErrorHandling/AppError.js";
import { globalErrorHandler } from "./Middlewares/globalErrorHandler.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const swaggerDocument = JSON.parse(
  fs.readFileSync("./swagger-output.json", "utf-8"),
);

const app = express();
const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.get("/", (req, res) => res.send("Hello World!"));
// Handle unhandled routes
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

dbConnection();

app.listen(port, () => {
  console.log(`Server is running succesfully at ${port}`);
});
