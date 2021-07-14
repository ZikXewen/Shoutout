import express from "express";
import { createEvent, fetchPosts } from "../controllers/events.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/:page", fetchPosts);

export default router;
