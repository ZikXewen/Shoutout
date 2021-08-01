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
  savePost,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/count", countPosts);
router.post("/fetch/:sortType/:page/", fetchPosts);
router.post("/", createPost);
router.delete("/:postId", deletePost);
router.patch("/like/:postId/:userId", likePost);
router.patch("/dislike/:postId/:userId", dislikePost);
router.get("/:postId/comments/count", countComments);
router.get("/:postId/comments/:page", fetchComments);
router.post("/:postId/comments", createComment);
router.post("/save/:postId/:userId", savePost);

export default router;
