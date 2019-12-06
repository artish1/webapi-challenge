const express = require("express");
const router = express.Router();
const actionModel = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log("Error getting all actions", err);
      res.status(500).json({ error: "Could not get all actions" });
    });
});

module.exports = router;
