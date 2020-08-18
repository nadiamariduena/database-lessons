//MongoDB with EXPRESS
// First REST API Representational State Transfer
// small explanation of any server that can : create, delete, update, read requests.
// connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb7
/*
This part of the line above, represents the database i am working with 
but since its the beginning  and i havent created any of my own, this one is a standard: 

?compressors=disabled&gssapiServiceName=mongodb

 
 */
// -------------------
require("dotenv").config();
/*

require("dotenv").config();
the line above is going to read the config  that you have in the .env file, that s why you
are requiring dotenv
 
 */

const http = require("http");
const app = require("./app");

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT);
