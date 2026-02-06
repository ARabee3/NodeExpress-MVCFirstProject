import { commentModel } from "../../Database/Models/comments.model.js";

const getComments = async (req, res) => {
  const allComments = await commentModel.find();
  res.json({
    message: "All Available Comments:",
    data: allComments,
  });
};

const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await commentModel.findById(commentId);
    if (comment) {
      return res.json({ message: "Found Comment", data: comment });
    }
    res.status(404).json({ message: "Comment Not Found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid Request" });
  }
};

const addComment = async (req, res) => {
  req.body.user = req.user._id;
  req.body.post = req.params.postId;
  let newComment = await commentModel.create(req.body);
  if (newComment) {
    res.status(201).json({
      message: "Comment Added Successfully",
      data: newComment,
    });
  } else {
    res.status(400).json({
      message: "Cannot Add a New Comment",
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await commentModel.findByIdAndUpdate(commentId, req.body);
    if (comment) {
      return res.json({
        message: "Comment Updated Successfully",
        data: comment,
      });
    }
    res.status(404).json({ message: "Comment Not Found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid Request" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await commentModel.findByIdAndDelete(commentId);
    if (comment) {
      return res.json({
        message: "Comment Deleted Successfully",
        data: comment,
      });
    }
    res.status(404).json({ message: "Comment Not Found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid Request" });
  }
};

export {
  getComments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
