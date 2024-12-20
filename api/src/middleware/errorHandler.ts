import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: {
    status?: number;
    message?: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // geliştirme ortamında terminalde detayları görebilmek için
  console.log("Hata meydana geldi");
  console.error("Hata Detayları:", {
    message: err.message || "Bilinmeyen Hata",
    status: err.status || 500,
    stack: (err as Error).stack || "Stack bilgisi yok", // hatanın yolu
  });

  // kullanıcıya hata bilgisi gönderme
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message || "Üzgünüz, bir şeyler ters gitti.";
  return res.status(errStatus).json({
    status: "Error",
    statusCode: errStatus,
    message: errMessage,
  });
};

export default errorMiddleware;
