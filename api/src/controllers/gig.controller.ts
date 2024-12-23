import { NextFunction, Request, Response } from "express";
import c from "../utils/catchAsync.ts";

export const getAllGigs = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({ message: "İşlem Başarılı" });
  }
);

export const getGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "İşlem Başarılı" });
});

export const createGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({ message: "İşlem Başarılı" });
  }
);

export const deleteGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({ message: "İşlem Başarılı" });
  }
);
