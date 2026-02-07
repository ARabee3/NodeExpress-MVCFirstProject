import Joi from "joi";

const signupVal = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 3 to 30 characters and alphanumeric",
    }),
  role: Joi.string().valid("user", "admin"),
});

const signinVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { signupVal, signinVal };
