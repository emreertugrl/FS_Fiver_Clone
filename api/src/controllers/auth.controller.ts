import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

// ------------- Kayıt Ol ---------------
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

// ------------- Giriş Yap ---------------
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // ismine göre kullanıcıyı ara
  const user: IUser = await User.findOne({ username: req.body.username });

  // kullanıcıyı bulamazsa hata gönder
  if (!user) {
    res.status(401).json({ message: "Kullanıcı bulunamadı" });
    return;
  }

  // şifreyi doğrula
  const isMatch = bcrypt.compareSync(req.body.password, user.password);

  // şifreler eşleşmediyse hata gönder
  if (!isMatch) {
    res.status(401).json({ message: "Şifre yanlış" });
    return;
  }

  // token üret
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_KEY as string, {
    expiresIn: process.env.JWT_DURATION,
  });
  // şifre alanını kaldır
  user.password = undefined;

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      expires: new Date(Date.now() + 8 * 24 * 3600 * 1000), //14 gün
    })
    .status(200)
    .json({ message: "Hesaba giriş yapıldı", token: token, user: user });
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie("token").status(200).json({ message: "Hesaptan çıkış yapıldı" });
};
