//  You will not require express here because this is the server file
// const express = require("express");
// const app = express();   we don't really use app in server, you will be using this in the app file
//
//
//
//
//
//

const http = require("http");

const app = require("./app"); //you have to create a file app
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT);
