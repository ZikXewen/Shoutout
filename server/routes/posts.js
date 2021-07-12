import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  countPosts,
  likePost,
  dislikePost,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/count", countPosts);
router.get("/:page", getPosts);
router.post("/", createPost);
router.delete("/:postId", deletePost);
router.patch("/like/:postId/:userId", likePost);
router.patch("/dislike/:postId/:userId", dislikePost);

export default router;
