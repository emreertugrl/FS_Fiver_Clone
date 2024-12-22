import multer from "multer";
// diske ya da sunucuya yüklenecek olan işleme göre değişir.
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
export default upload;
