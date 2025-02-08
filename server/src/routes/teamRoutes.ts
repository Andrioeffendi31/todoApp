import { Router } from "express";

import { getTeams } from "../controllers/teamController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getTeams);

export default router;