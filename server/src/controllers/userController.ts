import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error while fetching users",
      error: error.message,
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: Number(userId),
      },
    });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error while fetching user",
      error: error.message,
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      passwordHash,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
      role
    } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        profilePictureUrl,
        passwordHash,
        teamId,
        role
      },
    });
    res.json({ message: "User Created Successfully", newUser });
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Internal server error while creating user",
        error: error.message,
      });
  }
};
