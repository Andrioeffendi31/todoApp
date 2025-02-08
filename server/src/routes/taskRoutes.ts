import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/taskController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getTasks);
router.post("/", authenticate, createTask);
router.patch("/:taskId/status", authenticate, updateTaskStatus);
router.get("/user/:userId", authenticate, getUserTasks);

export default router;