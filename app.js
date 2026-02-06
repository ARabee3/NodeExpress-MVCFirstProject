import express from "express";
import { dbConnection } from "./Database/db_connection.js";
import postRouter from "./Modules/post/post.routes.js";
import "dotenv/config";
import userRouter from "./Modules/user/user.routes.js";
import commentRouter from "./Modules/comment/comment.routes.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

dbConnection();

app.listen(port, () => {
  console.log(`Server is running succesfully at ${port}`);
});
