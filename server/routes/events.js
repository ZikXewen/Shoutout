import express from "express";
import {
  createEvent,
  fetchEvents,
  countEvents,
} from "../controllers/events.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/count", countEvents);
router.get("/:page", fetchEvents);

export default router;
