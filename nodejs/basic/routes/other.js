const express = require('express');

const router = express.Router();

//add middleware
//only to post request
router.post('/add', (request, response, next) => {
  listItem.push(request.body.message);
  response.redirect('/test');
});

//only to get request
router.get('/test', (request, response, next) => {
  response.send('<h1>At test</h1>');
});

module.exports.router = router;
