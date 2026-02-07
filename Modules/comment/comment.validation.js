import Joi from "joi";

const addCommentVal = Joi.object({
  text: Joi.string().min(5).required(),
  postId: Joi.string().hex().length(24).required(),
});

const updateCommentVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  text: Joi.string().min(5),
});

const deleteCommentVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export { addCommentVal, updateCommentVal, deleteCommentVal };
