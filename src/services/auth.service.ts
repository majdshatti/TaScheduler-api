// Models
import { User } from "../model/";

// Interface
import IUser from "../interfaces/user.interface";

export const findUserByCreds = async (username: string, password: string) => {
  try {
    // Find user by username
    const user = await User.findOne({ username }).select("+password");

    if (!user) return false;

    // Check password match
    const isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) return false;

    return user;
  } catch (error: unknown) {
    return false;
  }
};

export const createUser = (data: IUser): Promise<IUser> => {
  return User.create(data);
};
