import mongoose from "mongoose";
export default mongoose.model(
  "UserData",
  mongoose.Schema(
    {
      _id: String,
      name: String,
      imageUrl: String,
      stickers: { type: [String], default: [] },
      school: { type: String, default: "" },
      savedPosts: { type: [String], default: [] },
    },
    { _id: false }
  )
);
