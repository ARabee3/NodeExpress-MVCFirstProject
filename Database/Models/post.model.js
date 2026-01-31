import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: true,
      minlength: 10,
      unique: true,
    },
    postText: {
      type: String,
      required: true,
      minlength: 10,
    },
    privacy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const postModel = mongoose.model("Post", postSchema);
