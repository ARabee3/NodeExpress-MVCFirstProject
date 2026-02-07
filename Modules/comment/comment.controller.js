import { commentModel } from "../../Database/Models/comments.model.js";
import { AppError } from "../../Utils/ErrorHandling/AppError.js";
import { catchAsync } from "../../Utils/ErrorHandling/catchAsync.js";

const getComments = catchAsync(async (req, res, next) => {
  const allComments = await commentModel.find();
  res.status(200).json({
    message: "All Available Comments:",
    data: allComments,
  });
});

const getCommentById = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const comment = await commentModel.findById(commentId);
  if (!comment) {
    return next(new AppError("Comment Not Found", 404));
  }
  return res.json({ message: "Found Comment", data: comment });
});

const addComment = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  if (req.params.postId) req.body.post = req.params.postId;

  let newComment = await commentModel.create(req.body);
  res.status(201).json({
    message: "Comment Added Successfully",
    data: newComment,
  });
});

const updateComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const currentUserId = req.user._id;

  const comment = await commentModel.findOneAndUpdate(
    { _id: commentId, user: currentUserId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!comment) {
    return next(
      new AppError(
        "Comment not found or you are not authorized to update it",
        404,
      ),
    );
  }
  return res.json({
    message: "Comment Updated Successfully",
    data: comment,
  });
});

const deleteComment = catchAsync(async (req, res, next) => {
  const commentId = req.params.id;
  const currentUserId = req.user._id;

  const comment = await commentModel.findOneAndDelete({
    _id: commentId,
    user: currentUserId,
  });

  if (!comment) {
    return next(
      new AppError(
        "Comment not found or you are not authorized to delete it",
        403,
      ),
    );
  }
  return res.json({
    message: "Comment Deleted Successfully",
  });
});

export {
  getComments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
