import { Schema, model } from "mongoose";

// bir hizmet belgesinin tipi tanımlanır.
export interface IUser {
  name: string;
}
// şema oluşturulur
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

// model oluşturulur
const User = model<IUser>("User", userSchema);

export default User;
