import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  console.log(process.env.NODE_ENV === "development");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(token);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
};

export default generateToken;
