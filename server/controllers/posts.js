import Post from "../models/Post.js";

export const countPosts = async (req, res) => {
  try {
    const count = await Post.estimatedDocumentCount();
    res.status(200).json({ count });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getPosts = async (req, res) => {
  const { page } = req.params;
  try {
    const posts = await Post.find(null, null, {
      skip: page * 10,
      limit: 10,
      sort: "-createdAt",
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
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
export const likePost = async (req, res) => {
  const { postId, userId } = req.params;
  const oldPost = await Post.findById(postId);
  if (!oldPost) res.status(404).json({ message: "No post with such ID" });
  try {
    if (oldPost.likes.indexOf(userId) === -1) {
      oldPost.likes = [...oldPost.likes, userId];
    } else {
      oldPost.likes = oldPost.likes.filter((userLike) => userLike !== userId);
    }
    await Post.findByIdAndUpdate(postId, oldPost);
    res.status(200).json(oldPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const dislikePost = async (req, res) => {
  const { postId, userId } = req.params;
  const oldPost = await Post.findById(postId);
  if (!oldPost) res.status(404).json({ message: "No post with such ID" });
  try {
    if (oldPost.dislikes.indexOf(userId) === -1) {
      oldPost.dislikes = [...oldPost.dislikes, userId];
    } else {
      oldPost.dislikes = oldPost.dislikes.filter(
        (userDislike) => userDislike !== userId
      );
    }
    await Post.findByIdAndUpdate(postId, oldPost);
    res.status(200).json(oldPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
