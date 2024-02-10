import asyncHandler from "express-async-handler";

const getTest = asyncHandler(async (req, res) => {
  res.status(200).json("TEST CONTROLLER WORKS");
});

const cookieSet = asyncHandler(async (req, res) => {
  res.cookie("testCookie", "testValue", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  res.send("Test cookie set");
});

const cookieCheck = asyncHandler(async (req, res) => {
  if (req.cookies.testCookie) {
    res.send(`Test cookie value: ${req.cookies.testCookie}`);
  } else {
    res.send("Test cookie not found");
  }
});

export { getTest, cookieSet, cookieCheck };
