const crypto = require('crypto');

exports.reset = (request, reponse, next) => {
  crypto.randomBytes(32, (error, buffer) => {
    if (error) {
      return console.log(error);
    }
    const token = buffer.toString('hex');
    // send this to db and then mail it
  });
};
