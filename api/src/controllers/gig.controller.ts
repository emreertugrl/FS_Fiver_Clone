import { NextFunction, Request, Response } from "express";
import c from "../utils/catchAsync.ts";
import Gig from "../models/gig.model.ts";
import error from "../utils/error.ts";
import upload from "../utils/cloudinary.ts";
import { ExtendedFiles } from "../types/index.ts";

export const getAllGigs = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const gigs = await Gig.find();

    res.status(200).json({ results: gigs.length, gigs, message: "İşlem Başarılı" });
  }
);

export const getGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "İşlem Başarılı" });
});

export const createGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //isteği atan kullanıcının hesabı satıcı hesabı değilse hata döndür
    if (!req.isSeller) return next(error(403, "Sadece satıcı hesabı hizmet oluşturabilir."));
    // kapak fotoğrafının url'ini ve diğer fotoğrafları url'lerini ekle
    const files = req.files as unknown as ExtendedFiles;
    // coverImage cloudinary yüklenir
    const coverImage = await upload(files.coverImage[0].path, next, "gig-images");
    // burada sadece promise döndürür
    const promises = files.images.map((image) => upload(image.path, next, "gig-images"));
    // tüm hepsini tek seferde yükleme aynı anda
    const images = await Promise.all(promises);
    // resimleri ve kapak fotoğrafını req.body eklenir.
    req.body.coverImage = coverImage.secure_url;
    req.body.images = images.map((image) => image.secure_url);
    // frontend özellikler gibi işlemleri , ile yazmasını isteyerek tek bir metin ile isteriz
    req.body.package_features = req.body.package_features.split(",");

    // işi bitirdikten sonra gig'i veritabanına kaydet (yeni hizmet oluşturma)
    // burada kullanıcının idsini istekten aldık yani gig içindeki üreten kişiyi population ile ref göstermiştik
    const savedGig = await Gig.create({ ...req.body, user: req.userId });
    // client cevap gönder
    res.status(201).json({ message: "Hizmet Oluşturuldu", gig: savedGig });
  }
);

export const deleteGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({ message: "İşlem Başarılı" });
  }
);
