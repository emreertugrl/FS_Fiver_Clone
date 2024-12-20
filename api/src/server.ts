import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes.ts";
import gigRouter from "./routes/gig.routes.ts";
import reviewRouter from "./routes/review.routes.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

//.env dosyasındaki değişkenlere erişme.
dotenv.config();

// veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Veritabanına bağlanıldı ✔✔✔"))
  .catch((err) => console.log("Veritabanına bağlanamadı 💣💣💣", err));

const app = express();

// middle wares
app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// hata yönetimi için mw
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
  console.log(`✔✔✔ Server is running on port ${process.env.PORT}`);
});
