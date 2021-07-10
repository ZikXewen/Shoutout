import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  content: String,
  creatorImageUrl: String,
  creatorId: String,
  creatorName: String,
  tags: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
  createdAt: Date,
  sticker: String,
});
export default mongoose.model("PostMessage", postSchema);
