import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  likes: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
