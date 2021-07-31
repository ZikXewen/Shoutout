import Event from "../models/Event.js";
import Comment from "../models/Comment.js";
export const createEvent = async (req, res) => {
  console.log(req.body);
  const newEvent = new Event({ ...req.body, createdAt: Date.now() });
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const countEvents = async (req, res) => {
  try {
    const count = await Event.estimatedDocumentCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const fetchEvents = async (req, res) => {
  const { school, page } = req.params;
  try {
    const events = await Event.find({ school: [school, null] }, "-comments", {
      skip: page * 10,
      limit: 10,
      sort: "-createdAt",
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const countComments = async (req, res) => {
  // Make-do method, using same document with posts' comments
  const { eventId } = req.params;
  try {
    const count = await Comment.countDocuments({ postId: eventId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export const fetchComments = async (req, res) => {
  const { eventId, page } = req.params;
  try {
    const comments = await Comment.find({ postId: eventId }, null, {
      skip: page * 10,
      limit: 10,
      sort: "-createdAt",
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export const createComment = async (req, res) => {
  const newComment = new Comment({
    ...req.body,
    postId: req.body.eventId,
    createdAt: Date.now(),
  });
  try {
    newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
