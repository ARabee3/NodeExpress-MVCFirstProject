import express from "express";
import {
  getPosts,
  addPost,
  getPostById,
  updatePost,
  deletePost,
} from "./post.controller.js";
import verifyToken from "../../Middlewares/auth/verifyToken.js";

const postRouter = express.Router();
postRouter.use(verifyToken);

postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", addPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
