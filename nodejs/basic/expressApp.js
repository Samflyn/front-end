const express = require('express');

const https = require('https');

const fs = require('fs');

const bodyParser = require('body-parser');

const multer = require('multer'); //middleware to receive files

const handlebars = require('express-handlebars'); //returns initialized view engine

const path = require('path');

const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

const accessLogs = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

app.use(helmet()); // security headers
app.use(compression());
app.use(morgan('combine', { stream: accessLogs })); // logging

// app.set('view engine', 'pug'); //global configs
// app.set('views', 'views'); //set views folder, default is views

// app.engine(
//   'handlebars',
//   handlebars({
//     layoutsDir: '/views/layouts/',
//     defaultLayout: 'layout',
//     extname: 'handlebars', //need to set layout ext
//   })
// ); //to be used for the html file ext i.e home.handlebars
// app.set('view engine', 'handlebars');
// app.set('views', 'views');

app.set('vew engine', 'ejs');
app.set('views', 'views');

const home = require('./routes/home');

const other = require('./routes/other');

app.use(bodyParser.urlencoded({ extended: true })); //parsing incoming data

const fileStorage = multer.diskStorage({
  destination: (request, file, callBack) => {
    callBack(null, 'images');
  },
  filename: (request, file, callBack) => {
    callBack(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (request, file, callBack) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callBack(null, true);
  }
  callBack(null, false);
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('document')
); //input name which will hold the file in the form

// to set data in all rendered pages
app.use((request, response, next) => {
  response.locals.isLoggedIn = true;
  response.locals.csrfToken = request.csrf();
});

// app.use('/admin', home); //filter url with admin --/admin/ then in requesthandler

app.use(express.static(path.join(__dirname, 'public'))); //read access to public folder directly

app.use(home.router, other.router);

app.use((request, response, next) => {
  response.status(404).send('<h1>404 not found</h1>');
});

// const sequelize = require('./database/database');

// sequelize
//   // .sync({ force: true }) //to drop and create
//   .sync()
//   .then((result) => app.listen(3000))
//   .catch((error) => console.log(error)); //creates tables defined in database file

const mongo = require('./database/mongodb');

const mongoDb = require('mongodb');

// mongo.mongoConnect(() => {
//   app.listen(3000);
//   console.log('Started...');
//   console.log('Inserting...');
//   mongo
//     .getDb()
//     .collection('products')
//     .find({ _id: new mongoDb.ObjectId('5f34aebfe098740d3559a5da') })
//     .next()
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));
// });

const mongoose = require('./database/usingMongoose');
const multer = require('multer');

mongoose.mongooseConnect
  .then(() => {
    saveMongoose();
    getMongoose();
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });

function getMongoose() {
  new mongoose.Product.find()
    .select('name -_id') //to get selected fields
    .populate('userId') //fetching related data
    .then((result) => {
      console.log(result);
    })
    .then((error) => {
      console.log(error);
    });
}

function saveMongoose() {
  new mongoose.Product({
    title: 'title',
    name: 'sam',
    desc: 'about',
    age: 5,
  })
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

// error handling middleware
// only for synchronous statements
//for async statements use then and catch
app.use((error, request, response, next) => {
  // response.error(error.httpStatusCode).redirect('/500');
  response.redirect('/500');
});

// ssl
const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

https.createServer({ key: privateKey, cert: certificate }, app).listen(3000);
