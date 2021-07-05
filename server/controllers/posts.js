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
  const newPost = new Post({ ...req.body, createdAt: Date.now() });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
