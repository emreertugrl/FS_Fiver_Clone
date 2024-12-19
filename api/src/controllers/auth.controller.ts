import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // şifreyi hashleme
  const hashedPass = bcrypt.hashSync(req.body.password, 12);

  // Kullanıcıyı veritabanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
  });

  // password'i undefined olarak sıfırla (gizle)
  newUser.password = undefined;

  res.status(200).json({ message: "Hesabınız oluşturuldu", data: newUser });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "İşlem Başarılı" });
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "İşlem Başarılı" });
};
