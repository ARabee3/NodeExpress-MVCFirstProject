import { postModel } from "../../Database/Models/post.model.js";
import { catchAsync } from "../../Utils/ErrorHandling/catchAsync.js";
import { AppError } from "../../Utils/ErrorHandling/AppError.js";

const getPosts = catchAsync(async (req, res, next) => {
  const posts = await postModel.find();
  res.status(200).json({
    message: "List Of Available Posts: ",
    data: posts,
  });
});

const getPostById = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const post = await postModel.findById(postId);
  if (post) {
    res.json({
      message: "Found Post",
      data: post,
    });
  } else {
    next(new AppError("No Post Found", 404));
  }
});

const addPost = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  let newPost = await postModel.create(req.body);

  res.status(201).json({
    message: "Post Added Successfully",
    data: newPost,
  });
});

const updatePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const currentUserId = req.user._id;

  const updatedPost = await postModel.findOneAndUpdate(
    {
      _id: postId,
      user: currentUserId,
    },
    {
      postTitle: req.body.postTitle,
      postText: req.body.postText,
    },
    { new: true, runValidators: true },
  );

  if (updatedPost) {
    res.status(200).json({
      message: "Updated Successfully",
      data: updatedPost,
    });
  } else {
    next(new AppError("Post not found or you are not authorized", 404));
  }
});

const deletePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const currentUserId = req.user._id;

  const deletedPost = await postModel.findOneAndDelete({
    _id: postId,
    user: currentUserId,
  });

  if (!deletedPost) {
    return next(new AppError("Post not found or you are not authorized", 403));
  }

  res.status(200).json({ message: "Post Deleted Successfully" });
});

export { getPosts, addPost, getPostById, updatePost, deletePost };
