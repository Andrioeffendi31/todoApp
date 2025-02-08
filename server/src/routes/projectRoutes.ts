import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getProjects);
router.post("/", authenticate, createProject);

export default router;