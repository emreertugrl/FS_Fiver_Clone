import { NextFunction, Request, Response } from "express";
import c from "../utils/catchAsync.ts";
import Gig from "../models/gig.model.ts";
import error from "../utils/error.ts";
import upload from "../utils/cloudinary.ts";
import { ExtendedFiles, Filters, Query } from "../types/index.ts";

const buildFilters = (query: Query): Filters => {
  let filters: Filters = {};
  if (query.userID) filters.user = query.userID;
  if (query.category) filters.category = query.category;
  if (query.min || query.max) {
    filters.package_price = {};
    if (query.min) filters.package_price.$gte = query.min;
    if (query.max) filters.package_price.$lte = query.max;
  }
  if (query.search) filters.title = { $regex: query.search, $options: "i" };
  return filters;
};

export const getAllGigs = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const filters = buildFilters(req.query);
    // console.log(req.query); // fe'den gelecek olan query isteği
    // console.log(filters); // backend feden gelen isteği mongodb çevirdiğimiz hali
    const gigs = await Gig.find(filters).populate("user", "username photo");

    if (gigs.length === 0) return next(error(404, "Hizmet bulunamadı"));

    res.status(200).json({ results: gigs.length, gigs, message: "İşlem Başarılı" });
  }
);

export const getGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const gig = await Gig.findById(req.params.id).populate("user", "-password");
  res.status(200).json({ gig, message: "Hizmet verisi alındı." });
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
    // hizmet detaylarını al
    const gig = await Gig.findById(req.params.id);

    // hizmet sahibi değilse hata döndür
    // populate etmezsek string, populate edersek nesne oluyor
    if (gig?.user != req.userId) return next(error(403, "Bu işlemi yapmaya yetkiniz yok."));
    // hizmeti sil
    await Gig.findByIdAndDelete(req.params.id);
    // client cevap gönder
    res.status(200).json({ message: "Hizmet başarıyla kaldırıldı" });
  }
);
