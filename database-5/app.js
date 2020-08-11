const express = require("express");
const app = express();
const morgan = require("morgan");

//
//If you do npm start when there is still nothing created in the following files,
// it will send you an error thats why you have to hide the four lines.
//
const usersRouter = require("./router/users");
// const booksRouter = require("./router/books");
//
//
/*
 *
 *
 */
/*





                                             -----------------------------
                                                   **   MORGAN  **
                                             -----------------------------





                                             
 */

app.use(morgan("dev"));
// Once you type the above, go to the postman and click SEND then check the console,
// it will show something like this:
// GET /login 404 8.716 ms - 33
// its telling the message error

/*                                              


                                                What is Morgan in Express?





Request Logging With Morgan. Morgan is another HTTP request logger middleware for Node. js. 
It simplifies the process of logging requests to your application. 







 */
app.use("/users", usersRouter);
// app.use("/books", booksRouter);
/*





                                             -----------------------------
                                                   **   REQUESTS  **
                                             -----------------------------





                                             
 */

// If you position messages like this block below after the ERROR messages, its will not be seen,
// so be sure it s always well positioned. As HADI said, the order in EXPRESS really matter.
//
//  **   -----------------------------
//            GET request
//  **   -----------------------------
//
app
  .get("/", (req, res) => {
    //   res.send("Hi Homepage");
    console.log("Hi");
    res.status(200).json({ text: "HELLO GET" });
    //   BE AWARE, always add the end part like so:  res.end();  IF YOU are not using the render or send.
    res.end();
  })

  //  **   -----------------------------
  //            POST request
  //  **   -----------------------------
  //
  .post("/", (req, res) => {
    console.log("Hi");
    res.status(200).json({ text: "HELLO POST " });
    res.end();
  })
  //  **   -----------------------------
  //            DELETE request
  //  **   -----------------------------
  //
  .delete("/", (req, res) => {
    console.log("Hi");
    res.status(200).json({ text: "HELLO DELETE " });
    res.end();
  })
  //  **   -----------------------------
  //            PUT request
  //  **   -----------------------------
  //
  .put("/", (req, res) => {
    console.log("Hi");
    res.status(200).json({ text: "HELLO PUT " });
    res.end();
  });
/*





 
                                    OLD WAY for when you are using the SAME ROUTE
            Notice that here you need to add the "app" before the .post request in the (no.2 block)

//                                              -----------------------------
//                                               Root Route for GET request
//                                              -----------------------------
//
(no.1 block)
// 
app.get("/", (req, res) => {
  console.log("Hi");
  res.status(200).json({ text: "HELLO GET" });
    res.end();
});

//   -----------------------------
//   Root Route for POST request
//// -----------------------------
//
(no.2 block)
// 
app.post("/", (req, res) => {
  console.log("Hi");
  res.status(200).json({ text: "HELLO POST " });
  res.end();
});






 */

// -------------------
//   ERROR
// -------------------
//
//
// The following will pass the error message only if there was an error.
app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  error.status = 404; //page not found
  next(error);
});
/*



When you will test it in the postman, it will show the previous message: 
"Not found" because the page isnt there.




 */
//
// -------------------
//   Error handling
// -------------------
//

app.use((error, req, res, next) => {
  res.status(error.status || 500); //500 Internal Server Error
  res.json({
    error: {
      message: error.message,
    },
  });
});

/*
 


  
 * The HyperText Transfer Protocol (HTTP) 500 Internal Server Error 
 server error response code indicates that the server encountered an 
 unexpected condition that prevented it from fulfilling the request.

This error response is a generic "catch-all" response. Usually, this 
indicates the server cannot find a better 5xx error code to response. 
Sometimes, server administrators log error responses like the 500 status 
code with more details about the request to prevent the error from happening 
again in the future.
 


*/

//You need to export the data of this file
// otherwise the connection with the server file will never happen
//
module.exports = app;
