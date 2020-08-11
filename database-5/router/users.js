const express = require("express");
const router = express.Router();
//
//
//
//
//
router.get("/", (req, res) => {
  res.send("Hey this is Users page");
});
//
//
//
router.get("/about", (req, res) => {
  res.send("Hey this is About");
});

//You need to export the data of this file
// otherwise the connection with the server file will never happen
//
module.exports = router;
