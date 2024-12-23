import { Schema, model } from "mongoose";

// bir hizmet belgesinin tipi tanımlanır.
export interface IGig {
  _id: string;
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];
  package_title: string;
  package_description: string;
  package_price: number;
  package_features: string[];
  package_duration: number;
  package_revisions: number;
  createdAt: string;
}
// şema oluşturulur
const gigSchema = new Schema<IGig>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: [true, "Lütfen title alanını belirleyin"] },
    description: {
      type: String,
      required: [true, "Lütfen description alanını belirleyin"],
      minlength: [15, "En az 15 karakter olmalıdır"],
      maxlength: [500, "En çok 500 karakter olmalıdır"],
    },
    reviewCount: { type: Number, default: 0 },
    starCount: { type: Number, default: 0 },
    category: { type: String, required: [true, "Lütfen kategori alanını belirleyin"] },
    coverImage: { type: String, required: [true, "Lütfen coverImage alanını belirleyin"] },
    images: { type: [String], required: [true, "Lütfen images alanını belirleyin"] },
    package_title: { type: String, required: [true, "Lütfen paket adını belirleyin"] },
    package_description: { type: String, required: [true, "Lütfen paket açıklamasını belirleyin"] },
    package_price: { type: Number, required: [true, "Lütfen paket fiyatını belirleyin"] },
    package_features: { type: [String], required: [true, "Lütfen paket özelliklerini belirleyin"] },
    package_duration: {
      type: Number,
      required: [true, "Lütfen paket teslimat süresini belirleyin"],
    },
    package_revisions: {
      type: Number,
      required: [true, "Lütfen paket revizyon sayısını belirleyin"],
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik eklenecek
  }
);

// model oluşturulur
const Gig = model<IGig>("Gig", gigSchema);

export default Gig;
