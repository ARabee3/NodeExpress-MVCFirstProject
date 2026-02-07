import express from "express";
import verifyToken from "../../Middlewares/auth/verifyToken.js";
import {
  addComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComment,
} from "./comment.controller.js";
import { validate } from "../../Middlewares/validation.js";
import {
  addCommentVal,
  updateCommentVal,
  deleteCommentVal,
} from "./comment.validation.js";

const commentRouter = express.Router();
commentRouter.use(verifyToken);

commentRouter.get("/", getComments);
commentRouter.get("/:id", getCommentById);
commentRouter.post("/:postId", validate(addCommentVal), addComment);
commentRouter.put("/:id", validate(updateCommentVal), updateComment);
commentRouter.delete("/:id", validate(deleteCommentVal), deleteComment);

export default commentRouter;
