import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  content: String,
  creatorImageUrl: { type: String, default: "" },
  creatorId: { type: String, default: "" },
  creatorName: { type: String, default: "Anonymous" },
  tags: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  totalReacts: { type: Number, default: 0 },
  dislikes: { type: [String], default: [] },
  savedBy: { type: [String], default: [] },
  createdAt: Date,
  sticker: String,
});
export default mongoose.model("PostMessage", postSchema);
