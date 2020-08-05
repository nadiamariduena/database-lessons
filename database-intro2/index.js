//
//
// For more detailed description of this index, go to the intro no.1
//
//
//
const express = require("express");
const app = express();
// DECLARE the Port   *   you have a lot of ports but avoid using the same in two services  *
// GO TO THE BOTTOM for the port
// const port = 3000;
//
//
//
//---------------------------------
//          Lowdb
//---------------------------------
//
//
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const jsonFile = new FileSync("db.json");
const db = low(jsonFile);
//
//
//

//---------------------------------
// TO PROCESS the JSON data
//---------------------------------
//
//
// The body-parser is a library where you parse the json and process it in this one
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//
//
//---------------------------------
//          root request
//---------------------------------
//
//
//
app.get("/", (req, res) => {
  res.send("Welcome to our lowdb");
});

//
//
//---------------------------------
//          DB INIT
//---------------------------------
//
//
app.get("/new", (req, res) => {
  // dont forget to type the .write()  otherwise it wont show anything :  .write();
  db.defaults({ articles: [], user: {}, num: 1 }).write();
  res.send("New db being initialized");
  //
  //
});
//
//---------------------------------
//          Db Adding NEW
//---------------------------------
//
app.get("/add", (req, res) => {
  //
  const id = req.query.id;
  const title = req.query.title;
  db.get("articles").push({ id: id, title: title }).write();
  //
  res.send(
    ` New DATA being entered with id = ${id} and title = ${title} copy    `
  );
});
//
//
//---------------------------------
//          LOOK UP
//---------------------------------
//
//
app.get("/find", (req, res) => {
  const idToFind = req.query.id;
  res.send(db.get("articles").find({ id: idToFind }).value());
});
//
//
//---------------------------------
//          UPDATE
//---------------------------------
//
app.get("/update", (req, res) => {
  db.update("num", (n) => n + 1).write();
  const num = db.get("num").value();
  res.send(`num is going to be increased by ONE, now num is = ${num}`);
});
//
//
//
//
//---------------------------------
//          USER NAME
//---------------------------------
//
app.get("/user", (req, res) => {
  const name = req.query.name;
  db.set("user.name", name).write();
  res.send(`HELLO ${name} heute is great `);
});

//
//
//
//---------------------------------
// POST method    url https://localhost:3000/login
//---------------------------------
//
//          {

//                 'userName': 'Melissa',
//                 'pass': 'whateverApple',

//          }

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const userPass = req.body.pass;

  if (userName === "Melissa" && userPass === "whateverApple") {
    res.status(200).send(`welcome ${userName}`);
  } else {
    res.status(401).send(`ìnvalid username or pass `);
  }
});
/*
List of HTTP status codes
// 
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

// 
// 
// ------
// 200    OK/successful
// ------
Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.
// 
// ------
// 201 Created
// ------

The request has been fulfilled, resulting in the creation of a new resource.
// 
// ------
// 202 Accepted
// ------
The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.


// ------
// 400 Bad Request
// ------
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing)

// ------
// 401 Unauthorized 
// ------

Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.[32] 401 semantically means "unauthorised",[33] the user does not have valid authentication credentials for the target resource.
Note: Some sites incorrectly issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website


*/

//---------------------------------
//        Remove
//---------------------------------
//
// You can add a async await, to give the server time if it s handling large DATA.
//
app.get("/delete", async (req, res) => {
  // to remove article
  // URL     /delete?title=something

  const title = req.query.title;
  await db.get("articles").remove({ title: title }).write();
  // you want to tell the user that everything went well
  res.status(200).send(`Your ${title} has been removed`);
});

//
//
//---------------------------------
//          Mini API
//---------------------------------
//
app.get("/api", (req, res) => {
  res.status(200).json({ id: 1, cityName: "Berlin", country: "DE" });
});

//---------------------------------
//
//

// Because I don't know if the server is going to be 3000 once I upload it to a real SERVER, to prevent the APP from breaking I have to type the following:  const PORT = process.env.PORT || 3000;
// what it actually means is : use the port that lives in the processor environment OR use the 3000   *****

const PORT = process.env.PORT || 3000;
//
app.listen(PORT, () => {
  console.log(`server listen on http://localhost:${PORT}`);
});
