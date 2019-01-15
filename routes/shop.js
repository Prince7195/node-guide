const path = require("path");
const express = require("express");

const roorDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(roorDir, "views", "shop.html"));
});

module.exports = router;
