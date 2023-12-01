const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const app = express();

// also set content-type header in client
app.use(bodyParser.json());

// to fix cors errors
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  next();
});

app.use(routes);

const server = app.listen(8080);
const io = require('./socket').init(server);
io.on('connection', (socket) => {
  console.log('connected new client');
});

// emit sends to all connected users
// broadcast sends to all users except the one whi sends the request
io.emit('time', { time: new Date().toISOString() });
