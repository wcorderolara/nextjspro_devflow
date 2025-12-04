import { model, models, Schema, Document } from "mongoose";

/**
 * User Interface used by the FrontEnd to avoid conflicts with
 * the Schema definition.
 */

export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
    location: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
