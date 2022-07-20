import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  slug?: string;
  password: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExprie?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): boolean;
  getResetPasswordToken(): string;
}

export default IUser;
