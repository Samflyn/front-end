const jwt = require('jsonwebtoken');

exports.login = (request, response, next) => {
  console.log(request);
  const user = request.body.user;
  const password = request.body.user;
  if (user == 'sam' && password == 'sam') {
    const token = jwt.sign({ user: user }, 'secret here', { expiresIn: '2m' });
    return response
      .status(200)
      .json({ token: token, time: new Date().toISOString() });
  } else {
    return response.status(401).json({ error: 'invalid password' });
  }
};
