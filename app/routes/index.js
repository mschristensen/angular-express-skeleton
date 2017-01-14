'use strict';

const changeCase = require('change-case');
const express = require('express');
const routes = require('require-dir')();  // requires all other files in this directory
const Response = require('../helpers/response.js');

module.exports = function(app) {
  // Initialize all routes
  Object.keys(routes).forEach(function(routeName) {
    let router = express.Router();

    // Middleware:
    // router.use(someMiddleware);

    // Initialize the route
    require('./' + routeName)(router);

    // Tie the router to it's url path
    app.use('/api/' + changeCase.paramCase(routeName), router);
  });
  
  // Catch unknown endpoints as 404
  app.all('/api/*', function(req, res, next) {
    return Response.NotFound().send(res);
  });
};
