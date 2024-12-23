import { v2 as cloudinary } from "cloudinary";
import error from "./error.ts";
import { NextFunction } from "express";

cloudinary.config({
  cloud_name: "dle9ht1yy",
  api_key: "269327591647783",
  api_secret: "DgUw8EiLswvQ4J6-vGwAnYjhumk",
});

const upload = async (
  file_path: string, // fotoğraf yolunu veriririz
  next: NextFunction,
  folder: string = "avatars", //varsayılan avatars , isterse farklı klasöre yükler
  type: "image" | "video" | "raw" | "auto" | undefined = "image" // varsayılan image isterse farklı dosya tipi ekleyebilir.
) => {
  // fotoğrafı buluta yükle
  return await cloudinary.uploader.upload(
    file_path, // fotoğraf yolu
    {
      // fotoğraf yükleneceği klasör ve özellikleri
      folder,
      resource_type: type,
    },
    (err) => {
      // fotoğrafın yüklenememe ve yüklenme durumları.
      if (err) return next(error(500, "Fotoğraf yüklenemedi"));
    }
  );
};

export default upload;
