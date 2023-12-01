const jwt = require('jsonwebtoken');

// send jwt in header as Authorization: 'Bearer ' + token
module.exports = (request, response, next) => {
  const token = request.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret here');
  } catch (error) {
    response.status(500).json(error);
  }
  if (!decodedToken) {
    response.status(401).json('Invalid token');
  }
  console.log(decodedToken);
};
