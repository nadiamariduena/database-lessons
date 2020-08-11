const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");

//---------------------------------------------------------------------------------------------
//If you do npm start when there is still nothing created in the following files,
// it will send you an error thats why you have to hide the four lines.
//---------------------------------------------------------------------------------------------
//
const usersRouter = require("./router/users");
// const booksRouter = require("./router/books");
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







                                             
 */
// --------------------------------  ** important **
// ALL ERR , normally all the GLOBAL errors go on the top

// app.use((req, res, next) => {
//   if (!req.userName) return next(createError(401, "Login in to see this page"));
//   // If the user has no username, then create a 401 error
//   next();
// });
// --------------------------------  ** important **
/*



                                             
 */

app.use("/users", usersRouter);
// app.use("/books", booksRouter);

/*



                                             -----------------------------
                                                   ** ADMIN  ERROR  **
                                             -----------------------------

                                             

 */
app.use("/admin", (req, res, next) => {
  if (!req.user) next(createError(401, "Please login to view this PAGE"));
  // if there s no a request from the user, then show an error 401 requiring the user,
  //                                                     to log in so to view the page.
});

/*





                                             -----------------------------
                                                   **   REQUESTS  **
                                             -----------------------------





                                             
 */

//  **   -----------------------------
//            GET request
//  **   -----------------------------
//
app
  .get("/", (req, res) => {
    console.log("GET");
    res.status(200).json({ text: "HELLO GET" });
    // res.end();
  })

  //  **   -----------------------------
  //            POST request
  //  **   -----------------------------
  //
  .post("/", (req, res) => {
    console.log("POST");
    res.status(200).json({ text: "HELLO POST " });
  })
  //  **   -----------------------------
  //            DELETE request
  //  **   -----------------------------
  //
  .delete("/", (req, res) => {
    console.log("DELETE");
    res.status(200).json({ text: "HELLO DELETE " });
  })
  //  **   -----------------------------
  //            PUT request
  //  **   -----------------------------
  //
  .put("/", (req, res) => {
    console.log("PUT");
    res.status(200).json({ text: "HELLO PUT " });
  });
/*



                                             -----------------------------
                                                   ** BILL  ERRORS  **
                                             -----------------------------

                                             

 */

app.post("/bill", (req, res, next) => {
  next(
    createError(402, `You don't have money`, {
      detail: {
        yourBalance: 400,
        itemCost: 6000,
      },
    })
  );
});

//-------------------
module.exports = app;
