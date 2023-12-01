exports.login = (request, response, next) => {
  response.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=6000; ');
  response.redirect('/');
};

const app = express();

const session = require('express-session');

const mongoStore = require('connect-mongodb-session')(session);

const store = new mongoStore({
  uri: 'mongo',
  collection: 'sessions',
});

// use as middleware
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

exports.logout = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect('/');
  });
};
