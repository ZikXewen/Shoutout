import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  likes: { type: Number, default: 0 },
  createdAt: Date,
});
export default mongoose.model("PostMessage", postSchema);
