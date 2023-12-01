const express = require('express');
const path = require('path');
const routes = require('../routes/router');

const router = express.Router();

const itemList = [];

router.use('/', (request, response, next) => {
  console.log('always runs');
  next(); //pass request to next middleware
});

//app.use looks for url starting with /
//app.get looks for the exact url match
router.get('/', (request, response, next) => {
  console.log('next middleware');
  response.sendFile(path.join(__dirname, '..', 'views', 'home.html')); //.. used to go up one level
  //automatically adds the header content-type
  response.render('puggy', { title: 'Home', itemList: itemList, path: '/' });
});

//always add dynamic routes to the end
router.get('/get/:id', routes.getId);

module.exports.router = router;
module.exports.itemList = itemList;
