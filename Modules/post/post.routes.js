import express from "express";
import {
  getPosts,
  addPost,
  getPostById,
  updatePost,
  deletePost,
} from "./post.controller.js";

const postRouter = express.Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getPostById);
postRouter.post("/posts", addPost);
postRouter.put("/posts/:id", updatePost);
postRouter.delete("/posts/:id", deletePost);

export default postRouter;
