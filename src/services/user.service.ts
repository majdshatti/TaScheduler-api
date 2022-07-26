// Models
import { User } from "../model/";

// Interface
import IUser from "../interfaces/user.interface";

export const getUserByCondition = (condition: object) => {
  try {
    const user = User.findOne(condition);

    return user;
  } catch (error) {
    console.log(error);
  }
};
