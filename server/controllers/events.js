import Event from "../models/Event.js";
export const createEvent = async (req, res) => {
  const newEvent = new Event({ ...req.body, createdAt: Date.now() });
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const fetchPosts = async (req, res) => {
  const { page } = req.params;
  try {
    const events = await Event.find(null, "-comments", {
      skip: page * 10,
      limit: 10,
      sort: "-createdAt",
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
