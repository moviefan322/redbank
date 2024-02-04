import asyncHandler from 'express-async-handler';

const getTest = asyncHandler(async (req, res) => {
  res.status(200).json('TEST CONTROLLER WORKS');
});

export { getTest };