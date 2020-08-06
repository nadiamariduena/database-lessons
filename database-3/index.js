//
//--------------------------------------------------
//                     MIDDLEWARE
//--------------------------------------------------

/*






WHAT is Middleware ?


Middleware functions are functions that have access to the request object (req), 
the response object (res), and the next function in the application’s request-response 
cycle. 

The next function is a function in the Express router which, when invoked, executes
the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:


Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware in the stack.

https://expressjs.com/en/guide/writing-middleware.html





//----------------------
// --- Teacher --- // 
//----------------------


Middleware is anything happening in between the time the server receives a 
request and sends a response to it,







*/

//
//
// 1.)__ require express from the library
const express = require("express");

// 2.)__ assign express a variable to start using it
const app = express();

// 3.)__  use the port that lives in the processor environment OR use the 3000
const PORT = process.env.PORT || 3000;

/* 
Because I don't know if the server is going to be 3000 once I 
upload it to a real SERVER, to prevent the APP from breaking 
I have to type the following:  
 
const PORT = process.env.PORT || 3000;

*/
//--------------------------------------------------------
//    connected to function logger that is on the bottom
//--------------------------------------------------------
// this serves to make the logger function GLOBAL
app.use(logger);
// Now the APP will use the function logger anytime it will get a request.
//  --go to the postman and under get and localhost/3000, you will see the "home"

//
//

// app.get      - this is the request handling
//  "/"         - this is the Route handling

app.get("/", (req, res) => {
  console.log(`Home`);
  res.send(`Home`); //     ('GET request to the homepage')
});

// Route paths:    https://expressjs.com/en/guide/routing.html

//
//
//
//
//

app.get("/about", userLogged, (req, res) => {
  console.log(`about`);
  res.send(`Hola ${req.userName}`);
});

//
//
//
//---------------------
//    FUNCTION logger
//---------------------
//
// logger is going to be executed before home
function logger(req, res, next) {
  console.log("log 1");

  // move out of this one, that is what next means
  // NEXT is not return!!
  next();
  console, log("log 2");
}
//
//
//
//---------------------
//    AUTHENTICATION
//---------------------
//

function userLogged(req, res, next) {
  if (req.query.name === "Melissa") {
    req.userName = "Melisssa";
    next();
  } else {
    res.send("Login or Register");
  }
}

//
//
//
//
//
app.listen(PORT, () => {
  console.log(`server listen on http://localhost:${PORT}`);
});

//
//
//
//
//
//

/*
 





List of HTTP status codes

https://en.wikipedia.org/wiki/List_of_HTTP_status_codes




// 
// 
// ------
// 200    OK/successful
// ------
Standard response for successful HTTP requests. The actual response will depend on the request 
method used. In a GET request, the response will contain an entity corresponding to the requested 
resource. In a POST request, the response will contain an entity describing or containing the 
result of the action.




// ------
// 201 Created
// ------
The request has been fulfilled, resulting in the creation of a new resource.
 


// ------
// 202 Accepted
// ------
The request has been accepted for processing, but the processing has not been completed. 
The request might or might not be eventually acted upon, and may be disallowed when 
processing occurs.



// ------
// 400 Bad Request
// ------
The server cannot or will not process the request due to an apparent client error
 (e.g., malformed request syntax, size too large, invalid request message 
  framing, or deceptive request routing)





// ------
// 401 Unauthorized 
// ------


Similar to 403 Forbidden, but specifically for use when authentication is required 
and has failed or has not yet been provided. The response must include a WWW-Authenticate 
header field containing a challenge applicable to the requested resource. See Basic access 
authentication and Digest access authentication.[32] 401 semantically means 
"unauthorised",[33] the user does not have valid authentication credentials for the target resource.
Note: Some sites incorrectly issue HTTP 401 when an IP address is banned from the 
website (usually the website domain) and that specific address is refused permission 
to access a website



*/
