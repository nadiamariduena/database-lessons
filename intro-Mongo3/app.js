// ------------

const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
// to process the json data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.json());
// https://www.npmjs.com/package/body-parser#bodyparserjsonoptions
app.use(bodyParser.raw());
// https://www.npmjs.com/package/body-parser#bodyparserrawoptions
//
/*Note As req.body's shape is based on user-controlled input, all properties and 
values in this object are untrusted and should be validated before trusting. For example, 
req.body.foo.toString() may fail in multiple ways, for example the foo property may not be 
there or may not be a string,
 and toString may not be a function and instead a string or other user input.
 */
// ------------
// ------------
// mongoDB
// 1_  grab the mongoose library
const mongoose = require("mongoose");
//
// connect to the data base, think that you already have the set up ready inside the .env
// so grab the variable DB_URL of the .env  and use it.
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //   if verything worked show a positive message
  .then(console.log("DB is connected"))
  //   if there was a problem catch it and send a negative message
  .catch((error) => {
    console.log(`There is a gigantic problem ${error.message}`);
  });
//

// ------------

/*

 Creating your own module, but why if i can already connect ?
Actually we have connection with Mongoose but not with each collection, so i need to find
a way express interact with that connection, and for that i have to create my own module where 
i have my collections and the schema for the collection and so that they are 
willing to talk to each other

*** so first start by creating a DIRECTORY call module
- keep in mind that you will need to create a module for each new collection.
- inside of the modules folder create a file called employeesModule.js

 */

//
// --------------------
//
// ********      if you see an error after typing the following lines:   * *****
// DONT Worry, its because the file "employees" inside the router folder is empty
app.use(express.json());
const employees = require("./router/employees");
app.use("/employees", employees);
//
//
// --------------------
//
module.exports = app;
