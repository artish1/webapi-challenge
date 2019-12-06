const express = require("express");

const router = express.Router();

router.use("/", (req, res) => {
  res.status(200).json({ msg: "Test" });
});

module.exports = router;
