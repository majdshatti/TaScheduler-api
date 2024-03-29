import { Schema, model } from "mongoose";
import crypto from "crypto";
import slugify from "slugify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUserDocument } from "../interfaces/user.interface";

const userSchema = new Schema<IUserDocument>(
  {
    username: String,
    slug: String,
    password: {
      type: String,
      select: false,
    },
    email: String,
    resetPasswordToken: String,
    resetPasswordExpire: String,
    createdAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
    updatedAt: Date,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/*** Pre proccessing data ***/
userSchema.pre("save", async function () {
  // Hashing password
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // Setting up date and slug
  this.updatedAt = new Date();
  this.slug = slugify(this.username, { lower: true });
});

/*** Static methods ***/
// Get jwt token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to reset password token field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.virtual("project", {
  ref: "Project",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const User = model<IUserDocument>("User", userSchema);
export default User;
