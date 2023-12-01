const flash = require('connect-flash');

exports.messages = (request, response, next) => {
  request.flash('error', 'Invalid email or password');
};

// use it in rendered page
// error: request.flash('error')[0]
// removes from session after the first use
