// client gelen çerez veya header ile gelen jwt token geçerliliğini kontrol et ,
// geçersiz ise hata gönder , geçerliyse request nesnesine kaydedilir.
import { NextFunction, Request, Response } from "express";
import error from "../utils/error.ts";
import jwt, { JwtPayload } from "jsonwebtoken";

type ExtendedPayload = { id: string; isSeller: boolean } & JwtPayload;

const protect = (req: Request, res: Response, next: NextFunction) => {
  // 1- Çerezler/headerla gelen tokene eriş
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  // 2- token yoksa hata ver
  if (!token) return next(error(403, "Yetkiniz yok, Token bulunamadı"));

  // 3- token geçerli mi
  jwt.verify(token, process.env.JWT_KEY as string, (err: any, payload: any) => {
    // 4- token geşersiz ise hata ver
    if (err) return next(error(403, "Token geçersiz veya süresi dolmuş"));
    // 5- geçerliyse req nesnesi içerisine kullanıcı bilgilerini ekle
    req.userId = (payload as ExtendedPayload).id;
    req.isSeller = (payload as ExtendedPayload).isSeller;
  });
  //   6- sonraki adım
  next();
};

export default protect;
