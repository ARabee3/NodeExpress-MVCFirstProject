import express from "express";
import verifyToken from "../../Middlewares/auth/verifyToken.js";
import {
  addComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComment,
} from "./comment.controller.js";

const commentRouter = express.Router();
commentRouter.use(verifyToken);

commentRouter.get("/", getComments);
commentRouter.get("/:id", getCommentById);
commentRouter.post("/:postId", addComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
