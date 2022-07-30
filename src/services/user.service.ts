// Models
import { User } from "../model/";
// Interfaces
import { IUser, IUserDocument } from "../interfaces";

export const getUserById = async (_id: string, populate?: string) => {
  populate = populate ?? "";
  return User.findOne({ _id }).populate(populate);
};

export const getUserBySlug = async (slug: string, populate?: string) => {
  populate = populate ?? "";
  return User.findOne({ slug }).populate(populate);
};

export const updateUser = async (slug: string, data: IUser) => {
  return User.findOneAndUpdate({ slug }, data, {
    new: true,
  });
};

export const destroyUser = async (user: IUserDocument) => {
  return user.deleteOne();
};
