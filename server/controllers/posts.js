import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const newPost = new Post({ ...req.body, createdAt: Date.now() }); // Might have to change createdAt
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
