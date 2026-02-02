import { postModel } from "../Database/Models/post.model.js";

const getPosts = async (req, res) => {
  const posts = await postModel.find();
  res.status(200).json({
    message: "List Of Available Posts: ",
    data: posts,
  });
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (post) {
      res.json({
        message: "Found Post",
        data: post,
      });
    } else {
      res.status(404).json({ message: "No Post Found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

const addPost = async (req, res) => {
  let newPost = await postModel.create(req.body);
  if (newPost) {
    res.status(201).json({
      message: "Post Added Successfully",
      data: newPost,
    });
  } else {
    res.status(400).json({
      message: "Cannot Add a New Post",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // findByIdAndUpdate is cleaner. { new: true } returns the updated document.
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
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
      res.status(404).json({ message: "No Post with the id Found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid format or validation error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await postModel.findByIdAndDelete(postId);
    res.status(204).json({
      message: "Post Deleted Succesfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid format" });
  }
};
export { getPosts, addPost, getPostById, updatePost, deletePost };
