import jwt from "jsonwebtoken";

import { getUserByCondition } from "../../services/user.service";

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;
    if (typeof decoded !== "string") {
      user = await getUserByCondition({ _id: decoded.id });
    }
    return user;
  } catch (err) {
    return Promise.reject("Unauthorized to access");
  }
};

export default verifyToken;
