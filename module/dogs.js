var express = require('express');
var router = express.Router();
/*
  The code below creates a router as a module,
  loads middleware, defines routes, and mountes route
*/
// Middleware that is specific to this router
router.use( function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

  // Define the home page route
router.get('/', (req, res) => res.send('Dogs Home Page'));

  // Define the about route
router.get('/about', (req, res) => res.send('Dogs About Page'));

module.exports = router;
