export const getCookieOptions = () => {
  const cookieOptions = {
    expires: new Date(Date.now() + eval(process.env.JWT_COOKIE_EXPIRE)),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  return cookieOptions;
};
