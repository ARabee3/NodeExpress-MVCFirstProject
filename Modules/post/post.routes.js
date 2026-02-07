import express from "express";
import {
  getPosts,
  addPost,
  getPostById,
  updatePost,
  deletePost,
} from "./post.controller.js";
import verifyToken from "../../Middlewares/auth/verifyToken.js";
import { validate } from "../../Middlewares/validation.js";
import { addPostVal, updatePostVal, deletePostVal } from "./post.validation.js";

const postRouter = express.Router();
postRouter.use(verifyToken);

postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", validate(addPostVal), addPost);
postRouter.put("/:id", validate(updatePostVal), updatePost);
postRouter.delete("/:id", validate(deletePostVal), deletePost);

export default postRouter;
