import Joi from "joi";

const addPostVal = Joi.object({
  postTitle: Joi.string().min(3).required(),
  postText: Joi.string().min(10).required(),
});

const updatePostVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  postTitle: Joi.string().min(3),
  postText: Joi.string().min(10),
});

const deletePostVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export { addPostVal, updatePostVal, deletePostVal };
