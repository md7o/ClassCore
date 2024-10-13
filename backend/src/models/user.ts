import { Schema, model, Document } from "mongoose";

// ====DEFINE PROPERTY TYPES====
interface IUser extends Document {
  name: string;
  birth: Date;
  college: string;
  country: string;
  status: string;
  card: boolean;
  phone: string;
}

// ====SCHEMA====
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    birth: { type: Date, required: true },
    college: { type: String, required: true },
    country: { type: String, required: true },
    status: { type: String, required: true },
    card: { type: Boolean, required: true, default: false },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

//====CREATE AND EXPORT THE MODEL====
export default model<IUser>("User", userSchema);
