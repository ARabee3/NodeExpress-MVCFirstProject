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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false },
);

export const postModel = mongoose.model("Post", postSchema);
