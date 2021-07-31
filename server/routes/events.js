import express from "express";
import {
  createEvent,
  fetchEvents,
  countEvents,
  createComment,
  fetchComments,
  countComments,
} from "../controllers/events.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/count", countEvents);
router.get("/:school/:page", fetchEvents);
router.get("/:eventId/comments/count", countComments);
router.get("/:eventId/comments/:page", fetchComments);
router.post("/:eventId/comments", createComment);

export default router;
