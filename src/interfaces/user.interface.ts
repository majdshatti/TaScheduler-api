import { Document } from "mongoose";

interface IUser {
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

interface IUserDocument extends Document, IUser {}

export { IUser, IUserDocument };
