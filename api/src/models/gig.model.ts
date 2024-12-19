import { Schema, model } from "mongoose";

// bir hizmet belgesinin tipi tanımlanır.
export interface IGig {
  name: string;
}
// şema oluşturulur
const gigSchema = new Schema<IGig>({
  name: { type: String, required: true },
});

// model oluşturulur

const Gig = model<IGig>("Gig", gigSchema);
export default Gig;
