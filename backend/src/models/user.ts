import { Schema, model, Document } from "mongoose";

// ====DEFINE PROPERTY TYPES====
interface IUser extends Document {
  name: string;
  birth: Date;
  college: string;
  country: string;
  status: string;
  phone: string; // Change to string to handle phone numbers better
}

// ====SCHEMA====
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    birth: { type: Date, required: true },
    college: { type: String, required: true },
    country: { type: String, required: true },
    status: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

//====CREATE AND EXPORT THE MODEL====
export default model<IUser>("User", userSchema);
