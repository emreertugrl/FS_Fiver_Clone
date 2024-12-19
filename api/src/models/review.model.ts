import { Schema, model } from "mongoose";

// bir hizmet belgesinin tipi tanımlanır.
export interface IReview {
  name: string;
}
// şema oluşturulur
const reviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
});

// model oluşturulur

const Review = model<IReview>("Review", reviewSchema);
export default Review;
