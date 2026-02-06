import { mongoose, Schema } from "mongoose";
const commentsSchema = new Schema(
  {
    text: {
      type: String,
      minlength: 10,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { versionKey: false, timestamps: true },
);

export const commentModel = mongoose.model("Comment", commentsSchema);
