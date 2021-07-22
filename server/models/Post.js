import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  content: String,
  creatorImageUrl: { type: String, default: "" },
  creatorId: { type: String, default: "" },
  creatorName: { type: String, default: "Anonymous" },
  comments: { type: [Object], default: [] },
  tags: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
  createdAt: Date,
  sticker: String,
});
export default mongoose.model("PostMessage", postSchema);
