import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  const searchQuery = (query as string).toLowerCase();

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: searchQuery, mode: "insensitive" } }],
      },
    });

    res.json({ tasks, projects, users });
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error while searching`,
      error: error.message,
    });
  }
};
