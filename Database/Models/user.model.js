import { mongoose, Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 4,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      select: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    versionKey: false,
  },
);

export const userModel = mongoose.model("User", userSchema);
