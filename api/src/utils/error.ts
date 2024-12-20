type ExtendedError = Error & { status: number };
// Aldığı parametrelere göre hata mw'ne gönderilmek üzere bir error nesenesi oluşturur
const error = (status: number, message: string): ExtendedError => {
  //bir error nesenesi oluşturur
  const err = new Error(message) as ExtendedError;

  // hata nesnesine status bilgisini ekle
  err.status = status;
  // hata nesnesini döndür
  return err;
};

export default error;
