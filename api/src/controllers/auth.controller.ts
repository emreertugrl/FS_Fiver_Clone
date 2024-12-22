import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model.ts";
import jwt from "jsonwebtoken";
import error from "../utils/error.ts";
import c from "../utils/catchAsync.ts";

// ------------- Kayıt Ol ---------------
export const register = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // şifreyi hashleme
    const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

    // Kullanıcıyı veritabanına kaydet
    const newUser: IUser = await User.create({
      ...req.body,
      password: hashedPass,
    });

    // password'i undefined olarak sıfırla (gizle)
    newUser.password = "";
    // const { password, ...userWithoutPass } = newUser;

    res.status(200).json({ message: "Hesabınız oluşturuldu", data: newUser });
  }
);

// ------------- Giriş Yap ---------------
export const login = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // ismine göre kullanıcıyı ara
  const user: IUser | null = await User.findOne({ username: req.body.username });

  // kullanıcıyı bulamazsa hata gönder
  if (!user) return next(error(404, "Girdiğiniz bilgiler yanlış"));

  // şifreyi doğrula
  const isMatch = bcrypt.compareSync(req.body.password, user.password);

  // şifreler eşleşmediyse hata gönder
  if (!isMatch) return next(error(404, "Girdiğiniz bilgiler yanlış"));

  // token üret
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_KEY as string, {
    expiresIn: process.env.JWT_DURATION,
  });
  // şifre alanını kaldır
  // const { password, ...userWithoutPass } = user;
  user.password = "";

  res
    .cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 8 * 24 * 3600 * 1000), //14 gün
    })
    .status(200)
    .json({ message: "Hesaba giriş yapıldı", token: token, user: user });
});

// ------------- Çıkış Yap ---------------
export const logout = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie("token").status(200).json({ message: "Hesaptan çıkış yapıldı" });
});

// ------------- Profil Bilgilerini Al ---------------
export const profile = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // req nesnesi içerisindeki kullanıcı id'sine karşılık gelen kullanıcının verilerini al
  const user = await User.findById(req.userId);

  // kullanıcıyı bulamazsa hata gönder
  if (!user) return next(error(404, "Kullanıcı bulunamadı"));

  // şifre alanını kaldır
  user.password = "";

  res.status(200).json({ message: "Profil bilgileri alındı", user });
});
