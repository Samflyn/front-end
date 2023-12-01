const { check, validationResult } = require('express-validator');

// use as a middleware
check('email').isEmail();

// in controller
const error = validationResult(request);
console.log(error.array()[0].msg);
