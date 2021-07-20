import mongoose from "mongoose";
export default mongoose.model("CommentData", {
  postId: String,
  content: String,
  creatorId: String,
  creatorName: String,
  creatorImageUrl: String,
  createdAt: Date,
});
