import Joi from "joi";

const signupVal = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase, one lowercase, one number, and one special character.",
    }),
  role: Joi.string().valid("user", "admin"),
});

const signinVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { signupVal, signinVal };
