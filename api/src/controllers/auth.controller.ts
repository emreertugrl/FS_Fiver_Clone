import { NextFunction, Request, Response } from "express";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log(req);

  res.status(200).json({ message: "İşlem Başarılı" });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "İşlem Başarılı" });
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "İşlem Başarılı" });
};
