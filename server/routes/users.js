import { Router } from "express";

import { getUser, getSticker } from "../controllers/users.js";

const router = Router();

router.get("/", (req, res) => res.send("nothing to see"));
router.post("/", getUser);
router.patch("/:userId/:stickerName", getSticker);

export default router;
