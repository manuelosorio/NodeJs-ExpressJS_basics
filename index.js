var express = require ("express");
var path = require('path');

var app = express();


/*------------------------------------- 1 Routes ---------------------------------------

    1.1 Route Methods
    1.2 Route Paths
    1.3 Route Params
    1.4 Routes Handlers
    1.5 Response Methods
    1.6 app.route()

    INFORMATION BASED ON THE EXPRESSJS DOCS - https://expressjs.com/en/guide/routing.html

-----------------------------------------------------------------------------------------*/

    /*------------------------------- 1.1 Routes Methods -------------------------------

      • A route methods comes from HTTP methods, and is attached to an instance of the express class

      •Express supports get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, unlockm report, mkactivity, checkout, merge, m-search, notify, subscribe, path and search routing methods, all of which corresond to HTTP methods.

      • Special routing method, app.all(), does not come from any HTTP method. It is used for loading middleware functions at a path for all request methods

    ----------------------------------------------------------------------------------*/

  // GET Method
app.get('/', (req, res) => res.send('Hello World'));

  // POST Method
app.post('/', (req, res) => res.send('Got a POST request'));

  // PUT Method
app.put('/user', (req, res) => res.send('Got a PUT request'));

  // DELETE Method
app.delete('/user', (req, res) => res.send('Got a DELETE request'));

  // Special rout method
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section...');
  next();
});


    /*------------------------------- 1.2 Routes Paths -------------------------------

      1.2.1 Route Pase on strings
      1.2.2 Routes based on string patterns
      1.2.3 Routes based on regular expressions

      • In combination with a request method, define endpoint which requests can be made.

      • Can be strings, string patterns, or regular expressions

      • Characters ?, +, and () are subsets of regular expression counterparts. The hyphen and dot are interperated litterly by string-base paths

      • When using dollar sign character in a path string, make sure to enclose it escaped with ([ and ])
        ○ I.E. the path string for requests at "/data/$games", would be "/data/([$])book"

    ----------------------------------------------------------------------------------*/
    // 1.2.1 Route Pase on strings
app.get('/example', (req, res) => res.send('This is an example of a string base route'));
    // 1.2.2 Routes based on string patterns
      // Route will match /abcd and /acd
app.get('/ab?cd', (req, res) =>
  res.send('ab?cd' + '\n\ This is an example of a string pattern based route'));

      // Route will match abcd, abbcd, abbbcd, and so on
app.get('/ab+cd', (req, res) => res.send('ab+cd'));

      // Route will match abcd, abxcd, abRANDOMcd, ab123cd
app.get('/ab*cd', (req, res) => res.send('ab*cd'));
      // Route will match /abe and /abcde
app.get('/ab(cd)?e', (req, res) => res.send('ab(cd)?e'));

  // 1.2.3 Routes based on regular expressions
    // will match any route that contains 'z'
app.get(/z/, (req, res) => res.send('/z/'));

    // Will match any route that ends with "fly"
app.get(/.*fly$/, (req, res) => res.send('/.*fly$/'));

    // Matches /data/$book
app.get('/data/([\$])book', (req, res) => res.send('/data/([$])book'));


    /*------------------------------- 1.3 Routes Params -------------------------------

      • Route Parameters are named URL segments that are used to caputre teh values speified at there position in the URL.

      • Populated in the req.params object with the name of the route paramerter specified in the path as their respective keys


    ----------------------------------------------------------------------------------*/
    // 1.3.1
      // http://localhost:3000/users/manuel/games/L33fd3
      // {"userId":"manuel","gameId":"L33fd3"}
app.get('/users/:userId/games/:gameId', (req, res) => res.send(req.params));

    // 1.3.2 dots and hypens
      // Since dots and hypens are interperated litterly, they can be use along with route parameters for useful purposes

      // Using hyphen (-) in params
      // http://localhost:3000/flights/MCO-LAX
      // {"from":"MCO","to":"LAX"}
app.get('/flights/:from-:to', (req, res) => res.send(req.params));

    // Using dot (.) in params
    // http://localhost:3000/animalia/Canis.Lupus
    // {"genus":"Canis","species":"Lupus"}
app.get('/animalia/:genus.:species', (req,res) => res.send(req.params))

    // 1.3.3 Using regular expressions

  /*------------------------------- 1.4 Routes Handlers -------------------------------

    • Behave like middleware providing multiple callbacks to handle requests.
      ○ Callbacks may use  next('route') to bypass remaining route callbacks.
      ○ Can use this mechanism to give pre-conditions on a route

    • Can be in the form of a function, array of functions, or a combination both

  ----------------------------------------------------------------------------------*/

    // Single callback function
app.get('/handlers-ex/a', (req, res) => res.send('Hello From a'));

    // More than one callback functions
app.get('/handlers-ex/b', (req, res, next) => {
  console.log('Respond will be sent by next function');
  next();
}, (req, res) => {
  res.send('Hello from B!')
});

  // Array of functions
var callback0 = (req, res, next) => {
  console.log('Callback0');
  next();
}
var callback1 = (req, res, next) => {
  console.log('Callback1');
  next();
}
var callback2 = (req, res, next) => {
  console.log('Callback2');
}
app.get('/handlers-ex/c', [callback0, callback1, callback2])

  /*------------------------------- 1.5 Response Methods -------------------------------

    • Methods o nthe response object(res), if none of
      the methods bellow are used from a route handlers,
      the client request is left hanging

    • res.download()
      ○ Prompt a file to be downloaded
    • res.end()
      ○ End the response process
    • res.json()
      ○ Send JSON response
    • res.jsonp()
      ○ Send a JSON response with JSONP support
    • res.redirect()
      ○ Redirect a request
    • res.render()
      ○ Render a view template
    • res.send()
      ○ Send a response of various types
    • res.sendFile()
      ○ Send a files as on octet stream
    • res.sendStatus()
      ○ Set the response status code and send its string
        representation as the response body

  ----------------------------------------------------------------------------------*/

  /*-------------------------------- 1.6 app.route() --------------------------------

    • Can create chainable route handlers for a route
      ○ Since the path is specified at a single location,
       craeting modular routes is helpful

      MORE INFORMATION AT https://expressjs.com/en/4x/api.html#router

  ----------------------------------------------------------------------------------*/

app.route('/game').get((req, res) => {
  res.send('Get a random book');
}).post((req, res) => {
  res.send('Add a book');
}).put((req, res) => {
  res.send('Update the book');
});

//load static files
app.use('/app', express.static('public'));

//404 Error loades file to corrent page
app.use( (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '_status-errors', '404.html'));
  console.log("404 Error - User tried to reach a page that might not exist");
});


app.listen(3000, () => console.log('Listening on port 3000!'));
