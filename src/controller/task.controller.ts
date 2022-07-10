import { Request, Response, NextFunction } from "express";

// Middlewares
import asyncHandler from "../middleware/async";

// Services
import { createTask } from "../services/task.service";

// Interfaces
import IResponse from "../interfaces/response.interface";

export const addTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body as {
      name: string;
      description: string;
    };

    const task = await createTask({
        name: name,
        description: description
    })

    return res.status(201).json({
        success: true,
        message: ""
    } as IResponse)
  }
);
