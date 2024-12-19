import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes";
import gigRouter from "./routes/gig.routes";
import reviewRouter from "./routes/review.routes";

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

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
  console.log(`✔✔✔ Server is running on port ${process.env.PORT}`);
});
