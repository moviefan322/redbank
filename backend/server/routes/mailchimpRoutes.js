const express = require("express");
const router = express.Router();
const { getMailchimpData } = require("../controllers/mailchimpController");

router.get("/", getMailchimpData);

module.exports = router;
