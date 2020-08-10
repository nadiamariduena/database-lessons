//
// pkill -f node
// to restart the port
//
//                                           ** Lesson of the Day **
//                                                    CORS
//

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/router");

const PORT = process.env.PORT || 3000;

// any Route handler is going to be handled by router.js
// app.use("/", router);
app.use("/topics", router);
//EACH ONE of the following will need a different file
// app.use("/books", router);
// app.use("/users");

//
//
//
// app.use(cors(carsOptions));
/*
app.use(cors());  in this form means that i will use "Cross-origin resource sharing / CORS" for the whole page.
 but i hide it because i don't want all the pages to be shown, it serves more like Ioannis said, 
 to shown the area of a website which 
 is free and for the premium part which only few have access, in other words i decide what i shown and what not.

 Its useful for some apps for example when creating projects with API's

 *******        to see how you choose 'how to make visible to few or globally' , go to line 71    ***********
 
 */
//
//
//
//
//
//
//
//
// Its called whitelist in rapport to what websites are allowed to receive REQUESTS
// it wont work in my machine because in the moment i am using the localhost
//
const whitelist = ["http://example.com", "http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // by saying not to the localhost like so: || !origin) , you are able to use the whitelist, read line 38
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// ---------

/*--------------------------
----------------------------
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hey I am root page");
});
//
//
// the below is a copy paste from the page:    https://www.npmjs.com/package/cors
// ** to make it visible to just few... specific or globally check the line below
// app.get("/products/:id", cors(), function (req, res, next) {
app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for a Single Route" });
});
--------------------------
--------------------------



The default configuration is the equivalent of:

{
  "origin": "*",
- the star * means , any one able to access this website


  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
- what methods are allowed

  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

*/

// ------------
// res.set
// ------------
//

app.get("/", (req, res) => {
  res.set({
    "Content-Type": "application/json",
  });
  res.end();
});
/**
This "application/json", will change the format to whatever you choose here for example:
"application/json",
here you choose json
"application/xml" here xml



type this in postman:
localhost:3000/

and after that you will see that it automatically will change it to whatever you choose


 * 
 * 
 * 
 */
// -------------------------------------
// -----------
// REGEX
// -----------

// FOR THE regex expression you need the DOUBLE slash // , and to start with anything you need a dot and
// the star * ,and to end the line you need the dollar sign $ ...like so:    (/.*look$/,

/*


Now go to the postman and type: 
localhost:3000/look
localhost:3000/newlook

as you can see, it will show you the message "("I KNOW YOU");" because it found the word look and all of them.

and now this :

localhost:3000/lookparse    in this one you will see it wont work, thats because you specified that you wanted
 it to end at (/.*look$/, , this means that its going to search for the word look before the dollar sign and nothing
after this, so it will turn false if you have something written after the look word

*/

app.get(/.*look$/, (req, res) => {
  res.send("I KNOW YOU");
});

/*---------------------------------- Router related -------------------------------


IF YOU NOTICE, when you type:

localhost:3000/ 
and then you click on SEND

the message that is being shown is "eeee" and not anymore the stuff you have in the router.js,
and that is because the router.js only cares about the data it has inside of itself. TO SEE what i mean 
you have to type the following in the postman- 


type:

localhost:3000/topics/ 
and then click send

the result will be : HEY THIS IS HOMEPAGE router
because thats what you have inside of it, now add /about to the "topics" , like so:

 localhost:3000/topics/about
and then click SEND

The result will be:
HEY THIS IS About

 * 
 */

app.get("/users/:userId/books/bookId", function (req, res) {
  // access userId via: req.params.userId
  // access bookId via: req.params.bookId
  res.send(req.params);
});

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

/*










//---------------------
Why are CORS needed?
//---------------------


Why is CORS necessary? The CORS standard is needed because it allows servers to specify not 
just who can access its assets, but also how 
the assets can be accessed. Cross-origin requests are made using the standard HTTP request methods.



//---------------------
Is CORS a security Risk?
//---------------------


If implemented badly, CORS can lead to major security risk like leaking of API keys, other users data or even
much more. A very great example of security risk of CORS misconfiguration is this:


https://medium.com/@ehayushpathak/security-risks-of-cors-e3f4a25c04d7

Cross-origin resource sharing (CORS)
It is a browser’s mechanism which allows sharing of resources from different origins. 
So, basically you allow access to the websites you trust to share resource with, and 
when a website with another origin requests for a resource, the application sends an 
HTTP request with origin header. If the origin is trusted it sends back the requested 
resource with Access-Control-Allow-Origin andAccess-Control-Allow-Credentials header in response.
Origin header: Origin header contains the URL from where the request has originated.


Access-Control-Allow-Origin: This header is send back in the response from one website to a 
request originated from another website, telling the website that it is allowed to access the resource.
Access-Control-Allow-Credentials: If this header is set to true then only you can share 
cookies and other credentials with another website.


CORS Specification
> Multiple origins:
Access-Control-Allow-Origin: http://domain1.com http://domain2.com
However, no browser supports multiple origins.
> Wildcards (*):
Access-Control-Allow-Origin: *
Sadly, you can use only this wildcard, means you allow each and every website, you 
can’t use wildcards on any other way like https://*.website.com to allow all subdomains of your website.
For security measures it automatically disables the Allow-Credentials header when using a wildcard. 

You need to specify a domain if you want to allow credentials.


//---------------------
Why is Cors bad?
//---------------------

CORS isn't bad practice. ... CORS is not security. If servers have resources that need 
to be protected from certain users, it is not safe to rely solely on the Origin header to 
enforce this. Your server needs some other mechanism for security (such as OAuth2 and 
CSRF protection)

*/
