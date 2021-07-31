import mongoose from "mongoose";
export default mongoose.model(
  "EventMessage",
  mongoose.Schema({
    title: String,
    description: String,
    creatorImageUrl: String,
    creatorId: String,
    creatorName: String,
    createdAt: Date,
    beginTime: Date,
    endTime: Date,
    banner: String,
    school: String,
    link: String,
  })
);
