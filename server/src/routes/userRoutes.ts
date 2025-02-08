import { Router } from "express";

import { getUser, getUsers, postUser } from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getUsers);
router.post("/", authenticate, postUser);
router.get("/:userId", authenticate, getUser);

export default router;