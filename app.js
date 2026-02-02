import express from "express";
import { dbConnection } from "./Database/db_connection.js";
import postRouter from "./Modules/post.routes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(postRouter);

dbConnection();

app.listen(port, () => {
  console.log(`Server is running succesfully at ${port}`);
});
