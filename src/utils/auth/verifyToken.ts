import jwt from "jsonwebtoken";

// Get an id from a token
const verifyToken = async (token: string) => {
  // Decode a token to get a payload
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (typeof decoded !== "string") return decoded.id;

  return false;
};

export default verifyToken;
