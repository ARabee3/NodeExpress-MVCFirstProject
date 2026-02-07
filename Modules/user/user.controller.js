import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../Database/Models/user.model.js";
import userEvents from "../../Utils/Events/sendEmailOnRegisterationEvent.js";
import { AppError } from "../../Utils/ErrorHandling/AppError.js";
import { catchAsync } from "../../Utils/ErrorHandling/catchAsync.js";
import "dotenv/config";

const signup = catchAsync(async (req, res, next) => {
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) {
    return next(
      new AppError("Email already exists. Please use a different one.", 409),
    );
  }

  let newUser = await userModel.create(req.body);
  userEvents.emit("register", newUser);

  newUser.password = undefined;

  res.status(201).json({
    message: "user created successfully",
    data: newUser,
  });
});

const signin = catchAsync(async (req, res, next) => {
  const foundUser = await userModel
    .findOne({ email: req.body.email })
    .select("+password");

  if (!foundUser) {
    return next(new AppError("Email or Password is invalid", 401));
  }

  if (!foundUser.isEmailConfirmed) {
    return next(new AppError("Please Confirm Your Email First", 401));
  }
  const match = await bcrypt.compare(req.body.password, foundUser.password);

  if (match) {
    let token = jwt.sign(
      {
        _id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
      process.env.SECRETKEY,
      { expiresIn: "1h" },
    );
    res.json({ message: "Login Successful", token: token });
  } else {
    return next(new AppError("Email or Password is invalid", 401));
  }
});

const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.SECRETKEY);

  const user = await userModel.findByIdAndUpdate(
    decoded.id,
    { isEmailConfirmed: true },
    { new: true },
  );
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  return res.json({
    message: "Email verified successfully! You can now log in.",
  });
});
export { signup, signin, verifyEmail };
