import express from "express";
import {
  createPost,
  fetchPosts,
  deletePost,
  countPosts,
  likePost,
  dislikePost,
  countComments,
  fetchComments,
  createComment,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/count", countPosts);
router.get("/:sortType/:page", fetchPosts);
router.post("/", createPost);
router.delete("/:postId", deletePost);
router.patch("/like/:postId/:userId", likePost);
router.patch("/dislike/:postId/:userId", dislikePost);
router.get("/:postId/comments/count", countComments);
router.get("/:postId/comments/:page", fetchComments);
router.post("/:postId/comments", createComment);

export default router;
