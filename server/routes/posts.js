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
  reportPost,
} from "../controllers/posts.js";
const router = express.Router();

router.post("/", createPost);
router.get("/count", countPosts);
router.post("/fetch/:sortType/:page/", fetchPosts);
router.patch("/like/:postId/:userId", likePost);
router.patch("/dislike/:postId/:userId", dislikePost);
router.post("/save/:postId/:userId", savePost);
router.get("/report/:postId/:userId/:reportType", reportPost);
router.delete("/:postId", deletePost);
router.get("/:postId/comments/count", countComments);
router.get("/:postId/comments/:page", fetchComments);
router.post("/:postId/comments", createComment);
export default router;
