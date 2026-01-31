import express from "express";
import { dbConnection } from "./Database/db_connection.js";
import { postModel } from "./Database/Models/post.model.js";
import postRouter from "./Modules/post.routes.js";

const app = express();
app.use(express.json());
app.use(postRouter);

dbConnection;
postModel;

app.listen(3000, () => {
  console.log("Server is running succesfully");
});
