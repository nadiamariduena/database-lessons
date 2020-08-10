const express = require("express");
const router = express.Router();

/*

After you finish with the index.js , you have to remember that when you will
start with the router.js here, you will have to go back to the index.js and 
change or hide some stuff.

I conserved an original index,js inside the "original-index.txt"  

 */
// ROOT Route
// -----------
//  Homepage
// -----------
router.get("/", (req, res) => {
  res.send("HEY THIS IS HOMEPAGE router");
});
//
//
// -----------
//  About
// -----------
router.get("/about", (req, res) => {
  res.send("HEY THIS IS About");
});
//
//
//
//
module.exports = router;
