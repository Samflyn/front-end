const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

var _db;

const mongoConnect = (callBack) => {
  MongoClient.connect('mongo', { useUnifiedTopology: true })
    .then((result) => {
      _db = result.db();
      callBack();
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDb = () => {
  if (_db) return _db;
  else throw 'No database';
};

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;
