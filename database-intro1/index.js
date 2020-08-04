//
//
// All  of the following "require" is inside the modules library.
// more info: https://www.npmjs.com/package/lowdb/v/0.15.3?activeTab=readme
//
//
//
const express = require("express");
const app = express();
// DECLARE the Port   *   you have a lot of ports but avoid using the same in two services  *
const port = 3000;
//
//
//
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// here is where i read this file ('db.json'); and then assign the content of it to const jsonFile
const jsonFile = new FileSync("db.json");
// and then i convert it to the database i am working db = low(jsonFile)
const db = low(jsonFile);
//
//
//
//
//
//
//---------------------------------
//          DB INIT
//---------------------------------
//
//
app.get("/new", (req, res) => {
  // this is an extra step :  .write();  with this you communicate/order with/to the DATABASE, other ways you order things: write, read... if you dont do that step, it will not execute this part: { articles: [], user: {}, num: 1 }
  db.defaults({ articles: [], user: {}, num: 1 }).write();
  res.send("New db being initialized");
  //
  //
  //
  // FROM the moment you are going to type /new on the browser, its going to send a REQUEST to the server, the server execute that service and initialize the database with the following DATA: { articles: [], user: {}, num: 1 }
  //
  //
  // IF you noticed, before doing that the db.json was empty but after typing 'new' like so: http://localhost:3000/new  it automatically generated what you created here: { articles: [], user: {}, num: 1 }
});
//
//
//
//
//
//
//
//---------------------------------
//          Db Adding NEW
//---------------------------------
//
//
app.get("/add", (req, res) => {
  // theres no space in between, thats why you see the + between them
  // the question mark ? comes after the url handler which is in this case the "add"
  // URL :      you have to type this in the browser:    add?id=1&title=1+like+water
  //
  //
  //   console.log(req.query.id);  //once you do type this: http://localhost:3000/add?id=1  it will show 1 in the console.
  //
  //
  const id = req.query.id;
  const title = req.query.title;
  // now add it to the database
  db.get("articles").push({ id: id, title: title }).write();
  //
  res.send(
    ` New DATA being entered with id = ${id} and title = ${title} copy    `
    // URL :      you have to type this in the browser:    add?id=1&title=1+like+water after doing this, the same is going to happen, its going to send the request to the server and its going to execute the task and so generate the data article inside the the db.json. TEST IT AGAIN by typing id 2 or 3 etc, you will notice it generated another article inside the db.
  );
});
//
//
//
//
//
//
//---------------------------------
//          LOOK UP
//---------------------------------
//
//
app.get("/find", (req, res) => {
  // URL :      you have to type this in the browser:      /find?id=1
  const idToFind = req.query.id;
  res.send(db.get("articles").find({ id: idToFind }).value());
  //   TYPE This on the browser            http://localhost:3000/find?id=1
});
//
//
//
//
//---------------------------------
//          UPDATE
//---------------------------------
//
//
app.get("/update", (req, res) => {
  // i grab the db and immediately i want to update, i will update  num, so grab the num that you have plus 1
  db.update("num", (n) => n + 1).write();
  const num = db.get("num").value();
  res.send(`num is going to be increased by ONE, now num is = ${num}`);
  //   URL once done type this:             http://localhost:3000/update
  //   it will show you the num 2 and that is because you specified that n + 1
  // RESULT in the browser: num is going to be increased by ONE, now num is = 2
  //   if you updated again its going to return  3
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
  // URL  /user?name=Melissa

  // first i will grab the name
  const name = req.query.name;
  db.set("user.name", name).write();
  res.send(`HELLO ${name} heute is great `);
  // URL :      you have to type this in the browser:  http://localhost:3000/user?name=melissa
});
//
//
//
//
//
//

//---------------------------------
//          POST method    url https://website.com/login
//---------------------------------
//
//          {

//                 'email': 'myemail@email.co',
//                 'pass': '000callme000',

//          }
//  this is linked to the POST method
//  if you notice, here you dont use the "req.query" but instead you use the "req.body"
app.post("/login", (req, res) => {
  const userName = req.body.email;
  const userPass = req.body.pass;
});

//
//
//
//
//---------------------------------
//
//          ITS important to Listen *
app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
