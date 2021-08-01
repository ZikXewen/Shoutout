import { Router } from "express";

import {
  getUser,
  getSticker,
  setSchool,
  savePost,
  fetchSaved,
} from "../controllers/users.js";

const router = Router();

router.get("/", (req, res) => res.send("nothing to see"));
router.post("/", getUser);
router.patch("/school/:userId/:school", setSchool);
router.patch("/:userId/:stickerName", getSticker);
router.post("/save/:userId/:postId/", savePost);
router.get("/save/:userId/:page", fetchSaved);

export default router;
