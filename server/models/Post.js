import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creatorImageUrl: String,
  creatorId: String,
  creator: String,
  tag: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
  createdAt: Date,
  sticker: String,
});
export default mongoose.model("PostMessage", postSchema);
