import express from "express";
import { dbConnection } from "./Database/db_connection.js";
import postRouter from "./Modules/post/post.routes.js";
import "dotenv/config";
import userRouter from "./Modules/user/user.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(postRouter);
app.use(userRouter);

dbConnection();

app.listen(port, () => {
  console.log(`Server is running succesfully at ${port}`);
});
