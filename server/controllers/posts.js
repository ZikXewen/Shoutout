import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const countPosts = async (req, res) => {
  try {
    const count = await Post.estimatedDocumentCount();
    res.status(200).json({ count });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const fetchPosts = async (req, res) => {
  const { sortType, page } = req.params;
  const sortMap = { Newest: "-createdAt", Popular: "-totalReacts" };
  try {
    if (sortType === "Trending") {
      const posts = await Post.aggregate([
        { $unset: "comments" },
        {
          $addFields: {
            trendScore: {
              $divide: [
                "$totalReacts",
                { $subtract: [new Date(), "$createdAt"] },
              ],
            },
          },
        },
        { $sort: { trendScore: -1 } },
        { $skip: page * 10 },
        { $limit: 10 },
      ]);
      res.status(200).json(posts);
    } else {
      const posts = await Post.find(null, "-comments", {
        sort: sortMap[sortType],
        skip: page * 10,
        limit: 10,
      });
      res.status(200).json(posts);
    }
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
    await Comment.deleteMany({ postId });
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const likePost = async (req, res) => {
  const { postId, userId } = req.params;
  const oldPost = await Post.findById(postId);
  if (!oldPost)
    return res.status(404).json({ message: "No post with such ID" });
  try {
    if (oldPost.dislikes.indexOf(userId) !== -1) {
      oldPost.dislikes = oldPost.dislikes.filter(
        (userDislike) => userDislike !== userId
      );
      oldPost.totalReacts++;
    }
    if (oldPost.likes.indexOf(userId) === -1) {
      oldPost.likes = [...oldPost.likes, userId];
      oldPost.totalReacts++;
    } else {
      oldPost.likes = oldPost.likes.filter((userLike) => userLike !== userId);
      oldPost.totalReacts--;
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
  if (!oldPost)
    return res.status(404).json({ message: "No post with such ID" });
  try {
    if (oldPost.likes.indexOf(userId) !== -1) {
      oldPost.likes = oldPost.likes.filter((userLike) => userLike !== userId);
      oldPost.totalReacts--;
    }
    if (oldPost.dislikes.indexOf(userId) === -1) {
      oldPost.dislikes = [...oldPost.dislikes, userId];
      oldPost.totalReacts--;
    } else {
      oldPost.dislikes = oldPost.dislikes.filter(
        (userDislike) => userDislike !== userId
      );
      oldPost.totalReacts++;
    }
    await Post.findByIdAndUpdate(postId, oldPost);
    res.status(200).json(oldPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const countComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const count = await Comment.countDocuments({ postId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export const fetchComments = async (req, res) => {
  const { postId, page } = req.params;
  try {
    const comments = await Comment.find({ postId }, null, {
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
  const newComment = new Comment({ ...req.body, createdAt: Date.now() });
  try {
    newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
