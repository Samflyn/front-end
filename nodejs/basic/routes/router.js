const express = require('express');

//to read query params i.e /get/1?propertie=sss
module.exports.getId = (request, response, next) => {
  const Id = request.params.id;
  const paramss = request.query.propertie; //always strings
  response.send(`<h1>${Id}</h1><br><h1>${paramss}</h1>`);
};
