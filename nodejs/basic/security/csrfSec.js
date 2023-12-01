const csrf = require('csurf');
const { response } = require('express');

const csrfProtection = csrf();

app.use(csrfProtection);

// in render
// csrfToken: response.csrf()

// in view
// <input type="hidden" name="_csrf" value="<%= csrfToken %>"

// csrf is only for post request
// it automatically generates and parses from the request with name _csrf
