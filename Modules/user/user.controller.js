import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../Database/Models/user.model.js";
import userEvents from "../../Utils/Events/sendEmailOnRegisterationEvent.js";
import "dotenv/config";
const signup = async (req, res) => {
  try {
    let newUser = await userModel.create(req.body);
    userEvents.emit("register", newUser);
    newUser.password = undefined;
    res.status(201).json({
      message: "user created successfully",
      data: newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different one.",
      });
    }
    res.status(500).json({
      message: err.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const foundUser = await userModel
      .findOne({ email: req.body.email })
      .select("+password");

    if (!foundUser) {
      return res.status(401).json({ message: "Email or Password is invalid" });
    }

    if (!foundUser.isEmailConfirmed) {
      return res
        .status(401)
        .json({ message: "Please Confirm Your Email First" });
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
      res.status(401).json({ message: "Email or Password is invalid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    const user = await userModel.findByIdAndUpdate(
      decoded.id,
      { isEmailConfirmed: true },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      message: "Email verified successfully! You can now log in.",
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
export { signup, signin, verifyEmail };
