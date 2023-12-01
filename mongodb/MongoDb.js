// ========================= Basics ==============================
/*

Database -> Collection -> Document

Collection is document in sql

document is row in sql

show dbs -> to show list of all databases

use testing -> to switch to that database, if it does not exist it will be created automatically

db -> refers to current selected database

document inserted will generate an _id which is of type ObjectId which also contains timestamp and is used for sorting internally

JSON will be saved to BSON internally by mongodb

atommic operators are reserved keywords starting with $

with update we can replace the document when the atomic operator is not used

find gives us a cursor

pretty works only on cursor

Projection -> to get only required fields -> db.collection.find({},{name:1,_id:0})
by default _id is always is included if not specified use 1 to get the field or 0 otherwise

Embedded document limited to 100 nestings and 16mb size limit

to access structured data you can use {hobbies:"sports"} but for deeper levels it should be wrapped in string {"status.desc":"alive"}

$lookup -> to get the referenced document inside the fetched document on one step -> db.product.aggregate([$lookup: {from: "", localField: "", foreignField: "", as: ""}])

*/

// ========================== Validations ========================

db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comment'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'this must be objectId and is required',
        },
        comment: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['title', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                required: 'must be a string and is required',
              },
              author: {
                bsonType: 'objectId',
                required: 'must be an objectId and is required',
              },
            },
          },
        },
      },
    },
  },
});

// to change validations on existing one's use collMod -> collection modifier

db.runCommand({
  collMod: 'posts',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comment'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'this must be objectId and is required',
        },
        comment: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['title', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                required: 'must be a string and is required',
              },
              author: {
                bsonType: 'objectId',
                required: 'must be an objectId and is required',
              },
            },
          },
        },
      },
    },
  },
  //   validationAction: 'error', // default
  validationAction: 'warn',
});

// ================================================== Create ==============================================

// insertMany inserts document in order, if the fourth one in array fails the first three will already be inserted

// insertMany takes two arguments, the first one is the array and the second is config

db.hobbies.insertMany([], { ordered: false });

// by using ordered false even if the second one fails all the remaining documents will be saved

// writeConsern -> for any insert option we can make use of journel and also set timeout

db.lists.insertOne(
  { name: 'somename', age: 22 },
  { w: 1, j: true, wtimeout: 200 }
);

// default is w:1, j: undefined

// if journel is used the insertion is written to memory and journel

// if wtimeout is set too low we get an acknowledged: false even if the write is sucessfull

// atomicity -> while inserting a document, the document is either saved as a whole or is rolled back

// for importing json files to db

// mongoimport filename.json -d databasename -c collectionname --jsonArray --drop

// --jsonArray -> if the file contains array

// --drop -> if this collection already exists it will be dropped and reimported

// ========================================== Read =============================================================

// ========== Comparators ============

// for quering an embeded field

db.comments.find({ 'rating.average': { $gt: 7 } });

// for quering an embeded array, for arrays its not equal to but contains the value in it

db.comments.find({ generes: 'Thriller' });

// for equal to in array

db.comments.find({ generes: ['Thriller'] });

// for quering with a specific values, this returns the runtime of 30 and 42, for the opposite use $nin

db.comments.find({ runtime: { $in: [30, 42] } });

// ========== Logical =================

db.comments.find({ $or: [{ rating: { $lt: 5 } }, { rating: { $gt: 9 } }] });

db.comments.find({ $nor: [{ rating: { $lt: 5 } }, { rating: { $gt: 9 } }] });

db.comments.find({ $and: [{ rating: { $gt: 9 } }, { generes: 'Drama' }] });

// shorter syntax for and, by default mongodb and's all feilds inside

db.comments.find({ rating: { $gt: 9 }, generes: 'Drama' });

// in json the key cannot be specified more than once, if it is specified it will be replaced so $and is used for this

db.comments.find({ runtime: { $not: { $eq: 60 } } });

// ============ Element Operators ==================

// for checking if a field exists in document, this returns document which has age field and is null

db.users.find({ age: { $exists: true } });

db.users.find({ age: { $exists: true, $ne: null } }); // for not null value

db.users.find({ age: { $type: number } });

// ===================== Evaluation operators =================

// regex is less performant than using $text based on indexes

db.users.find({ description: { $regex: /something/ } });

// $expr is used to compare two fields inside one document which returns a certain value

// if $ is not used before field name it will be treated as a hard input

db.users.find({ $expr: { $gt: ['$volume', '$target'] } });

// check if volume is gt 190, then sub 30 else nothing and check if the value is gt target

db.users.find({
  $expr: {
    $gt: [
      {
        $cond: {
          $if: { $gte: ['$volume', 190] },
          then: { $substract: ['volume', 30] },
          else: '$volume',
        },
      },
      '$target',
    ],
  },
});

// for quering arrays

db.users.find({ 'hobbies.title': 'Sports' }); // returns all documents which contains hobbies with title Sports

db.users.find({ hobbies: { title: 'Sports' } }); // returns the exact embedded document

// mongodb does not support gt or lt with size, only exact value
// this returns hobbies with 3 items in array but does not check for the type

db.users.find({ hobbies: { $size: 3 } });

// in this the exact order matters as mongodb by default looks for equality

db.comments.find({ generes: ['Action', 'Thriller'] });

// by using $all order does not matter

db.comments.find({ generes: { $all: ['Action', 'Thriller'] } });

// this returns document with hobbies with specified value but not for the same element

db.comments.find({
  $and: [{ 'hobbies.title': 'Sports' }, { 'hobbies.frequency': { $gte: 3 } }],
});

// using $elemMatch returns document with specified values of the same element

db.comments.find({
  hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } },
});

// ======================== Cursor Operations =================================

const dataCursor = db.comments.find();

dataCursor.next(); // to get the next one

dataCursor.forEach((doc) => {
  {
    printjson(doc);
  }
});

dataCursor.hasNext(); // returns boolen

dataCursor.sort({ 'rating.average': 1 }); // 1-> asc, -1-> dec

dataCursor.sort({ 'rating.average': 1, runtime: 1 }); // sort by runtime, sort is only on cursor

dataCursor.sort({ 'rating.average': 1 }).skip(10); // to skip the given number of documents

dataCursor.sort({ 'rating.average': 1 }).skip(100).limit(10); // to limit the cursor to retrive from database

// ========================= Projection ========================================

// to get only the required fields in the document

db.comments.find({}, { name: 1, 'rating.average': 1, _id: 0 }); // _id by default 1 even if not specified

// for arrays, the first is filter by genere drama and the second is projection of array

db.comments.find({ generes: 'Drama' }, { 'generes.$': 1 });

db.comments.find(
  { generes: 'Drama' },
  { generes: { $elemMatch: { $eq: 'Horror' } } }
);

// to show only the required no of items in array

db.comments.find({ generes: 'Drama' }, { generes: { $slice: 3 } });

db.comments.find({ generes: 'Drama' }, { generes: { $slice: [1, 4] } });

// ======================================= Update =========================================

db.comments.updateOne({ id: 3 }, { $set: { hobbies: ['One', 'two'], age: 3 } });

db.comments.updateMany({ id: 3 }, { $set: { hobbies: ['One', 'two'] } });

// increment & decrementing

db.comments.updateOne({ id: 3 }, { $inc: { age: 1 } }); // -1 can also be used

// to increment and setting data, two operations cannot be on the same field with inc and set i.e on age

db.comments.updateOne(
  { id: 3 },
  { $inc: { age: 1 }, $set: { sports: ['One'] } }
);

// $min $max & $mul

// minimize , maximize & multiply

// min only works if new value is lower than existing value, max is reverse of min

db.comments.updateOne({ name: 'sam' }, { $min: { age: 25 } });

// for droping fields in document, $unset takes a document and the value can be anything as it will be ignored

db.comments.updateOne({ name: 'sam' }, { $unset: { phone: '' } });

// for renaming fields

db.comments.updateOne({ name: 'sam' }, { $rename: { age: 'level' } });

// $upsert -> if no data is found it will create new document or it will update the existing, useful when we don't know if data is saved to database

db.comments.updateOne({ name: 'sammy' }, { $set: { age: 7 } }); // if there is no sammy it will create new doc with name sammy and the age

// updating matched array elements

// to add a field to an element in an array
// $ referes to the first matched element

db.comments.updateOne(
  { hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } } },
  { $set: { 'hobbies.$.highFrequency': true } }
);

// to update all elements in an array
// $[] refers to all elements in array

db.comments.updateOne(
  { hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } } },
  { $set: { 'hobbies.$[].highFrequency': true } }
);

// to update elements based on filter

db.comments.updateOne(
  { hobbies: { age: { $gt: 15 } } },
  { $set: { 'hobbies.$[el].goodFrequency': true } },
  { arrayFilters: [{ 'el.frequency': { $gt: 2 } }] } // filter based on frequency
);

// to add elements to an array

db.comments.updateOne({}, { $push: { hobbies: { isSporty: true } } });

// adding multiple elements to an array in document

db.comments.updateOne(
  {},
  {
    $push: {
      hobbies: {
        $each: [
          { isOne: true, frequency: 2 },
          { isTwo: 'teue', frequenct: 5 },
        ],
        $sort: { frequency: 1 }, // optional to sort and store based on value
        $slice: 2, // optional
      },
    },
  }
);

// removing elements from an array

db.comments.updateOne(
  {},
  {
    $pull: { hobbies: { title: 'Hiking' } },
  }
);

// remove last or first element in array 1 for last, -1 for first

db.comments.updateOne(
  {},
  {
    $pop: { hobbies: 1 },
  }
);

// push can add duplicate data, but not $addToSet

db.comments.updateOne({}, { $addToSet: { hobbies: { isSporty: true } } });

// =======================================================================================================================================
// ========================================================  INDEXES  ====================================================================
// =======================================================================================================================================

// to add an index

db.persons.createIndex({ 'dob.age': 1 }); // element to index and order

db.persons.explain('executionStats').find({ 'dob.age': { $gt: 60 } });

// to drop index

db.persons.dropIndex({ 'dob.age': 1 }); // element to index and order

// having an index is slower when all the data is fetched or when a filter matches all the documents in data

// to create compound index
// compound index can also be used for the individual field filtering, also for sorting
// for sorting mongodb has 32MB of limit

db.persons.createIndex({ 'dob.age': 1, gender: 1 });

// to show all indexes

db.persons.getIndexes();

// for unique indexes

db.persons.createIndex({ email: 1 }, { unique: true });

// indexes for partial filters
// if only query is used then mongodb does a collection scan
//if both email and age are specified then the index is used based on the age value

db.persons.createIndex(
  { email: 1 },
  { partialFilterExpression: { 'dob.age': { $lt: 35 } } }
);

// mongodb treats non existing fields as null
// partial index for field -> only if the field exists in document

db.persons.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);

// Time To Live (TTL) index -> self destroying data after specified time period
// expireAfterSeconds only works for date fields for any other field it will be ignored, only for single index not compound
// if index is created on data, it will not remove the data after time period
// mongodb will trigger the index check when a new document is added after creating the index
// this will re-evaluate the existing documents

db.persons.createIndex({ createdAt: 1 }, { expireAfterSeconds: 30 });

// Covered Queries -> where examinedDocument are more and returnedDocument are 0
// if name is indexed and only name is projected then the query returns the name directly from the index and not from the document

db.persons.createIndex({ name: 1 });

db.persons.findOne({ name: 'sam' }, { _id: 0, name: 1 });

// multi-key index -> indexing on arrays
// compound indexes cannot work with two array fields only one

// specia kind of multi-key index -> Text index
// text index takes the words and stores it as an array of keywords
// it removes all stop waords and sotres only the keywords
// only one text index for one document

db.persons.createIndex({ description: 'text' });
db.persons.find({ $text: { $search: 'music' } }); // casing is ignored
db.persons.find({ $text: { $search: 'good music' } }); // returns documents containing good or music
db.persons.find({ $text: { $search: '"good music"' } }); // return specific phrase "\"good music"\"
db.persons.find({ $text: { $search: '-good music' } }); // for excluding a word
db.persons.createIndex(
  { title: 'text', description: 'text' },
  { default_language: 'english' } //default is english, when specified defines which stop words to exclude
);
db.persons.createIndex(
  { title: 'text', description: 'text' },
  { default_language: 'english', weights: { title: 1, description: 10 } } // determines text scores based on the weights
);
db.persons.find({ $text: { $search: '', caseSensitivi: true } });

db.persons.find(
  { $text: { $search: 'music' } },
  { score: { $meta: 'textScore' } }
);

// droping text index can be done by using name

db.persons.showIndexes();
db.persons.dropIndex('index.name');

// combined text index

db.persons.createIndex({ title: 'text', description: 'text' }); // this will combine and create one text index

// building indexes

db.persons.createIndex({ age: 1 }, { background: true }); // default false

//===============================================================================================================
//======================================== Geospacial Data ======================================================
//===============================================================================================================

// longitude, latitude, GeoJSON has many types

db.places.insertOne({
  name: 'zoo',
  location: { type: 'Point', coordiantes: [111, 222] },
});

// to find places near me

db.places.find({
  location: {
    $near: { $geometry: { type: 'Point', coordiantes: [112, 221] } }, // fails if no index GeoJSON field
  },
});

// to add index to GeoJSON field

db.places.createIndex({ location: '2dsphere' });

db.places.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordiantes: [112, 221] },
      $maxDistance: 30,
      $minDistance: 10,
    },
  },
}); // returns sorted points with nearest first

// to get points inside a certain area

const p1 = [111, 222]; // longitude and lat

db.places.find({
  location: {
    $goeWithin: {
      $geometry: { type: 'Polygon', coordiantes: [[p1, p2, p3, p4, p1]] }, // second p1 is to close the polygon
    },
  },
});

// to find if a point is inside an area

db.places.insertOne({
  name: 'someplace',
  area: { type: 'Polygon', coordiantes: [[p1, p2, p3, p4]] },
});

db.places.createIndex({ area: '2dsphere' });

db.places.find({
  area: {
    $goeIntersects: {
      $geometry: { type: 'Point', coordiantes: [111, 222] },
    },
  },
});

// to find places in a radius

db.places.find({
  location: { $goeWithin: { $centerSphere: [[111, 222], 1 / 6378.1] } }, // in radians, 1km in radians
}); // unsorted

//===============================================================================================================
//=============================================== Security ======================================================
//===============================================================================================================

// starting the db with auth enabled
// mongod --auth --dbpath Codes/mongo/

// we can crceate only one user after enabling auth on db using localhost. This is a localhost exception
// use admin

db.createUser({ user: 'sam', pwd: 'sam', roles: ['userAdminAnyDatabase'] });

// to login we can use either
// mongo
// use admin
// db.auth('sam','sam')

// mongo -u sam -p sam --authenticationDatabase admin

// to create new user on a db
// use dbName

db.createUser({ user: 'dev', pwd: 'dev', roles: ['readWrite'] });

// to logout

db.logout();

// to edit user roles

db.updateUser('user', { roles: ['readWrite'] });

// to add db to user

db.updateUser('user', {
  roles: ['readwrite', { role: 'readWrite', db: 'dbName' }],
});

// to get info of a user

db.getUser('user');

//===============================================================================================================
//============================================ Fault Tolerence ==================================================
//===============================================================================================================

// Capped Collections -> limited no.of documents that can be stored and oldest data is automatically deleted when the limit excedes

db.createCollection('name', { capped: true, size: 10000, max: 100 }); // default to 4 bytes, max is no of documents

// by default capped collection return data in the order they are inserted
// to reverse the order we can use sort: -1 or
// $natural refers to default behaviour

db.capped.find().sort({ $natural: -1 });

// Replica Sets -> multiple instances of db, this will save data asyn to these instances
// if the primary instance goes offline the secondary node will be elected and acts as primary
// the read requests can be configured to distribute them across secondary nodes but the write requests always go to primary node

// sharding (Horizontal Scaling) -> Multiple servers having chunks of seperate data of the same app
// mongos is used for routing and configuring where the data is stored and retrieved
// Shard key -> is added to every document, used by server to understand where the document belongs to
// while fetching data if shard key is specified mongos will route the request to a specified server
// if the key is not specified mongos broadcasts the request to all servers and merges the response and returns it

// Transaction -> to rollback changes in a session // in mongo 4 and above

const session = db.getMongo().startSession(); // group all request based on session

session.startTransaction();

const usersCollection = session.getDatabase('blog').users; // get session based on db

// do stuff

session.commitTransaction(); // save session

session.abortTransaction(); // abort session

//===============================================================================================================
//============================================ Aggregation Framework ============================================
//===============================================================================================================

// each stage has piped output from previous stage as input

db.persons.aggregate([{ $match: { gender: 'male' } }]);

db.persons
  .aggregate([
    { $match: { gender: 'female' } },
    {
      $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } }, // _id refers to the fields by which they should be grouped by
    },
  ])
  .pretty();

db.persons
  .aggregate([
    { $match: { gender: 'female' } },
    {
      $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } },
    },
    { $sort: { totalPersons: 1 } },
  ])
  .pretty();

// to transform data

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        // fullName: { $concat: ['Hello', 'There'] }, // to hard code data
        fullName: { $concat: ['$name.first', ' ', '$name.last'] }, // $ refers to field of incoming document
        fullName: {
          $concat: [
            { $toUpper: '$name.first' }, // turns all letters to upper
            ' ',
            { $toUpper: '$name.last' },
          ],
        },
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            }, // oonly the first letter
            ' ',
            { $toUpper: '$name.last' },
          ],
        },
      },
    },
  ])
  .pretty();

// conversions

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $convert: { input: '$dob.date', to: 'date' } },
        age: '$dob.age',
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
  ])
  .pretty();

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: '$dob.age',
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
  ])
  .pretty();

// conversion shortcut

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: '$dob.age',
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: { birthYear: { $isoWeekYear: '$birthdate' } },
        numPersons: { $sum: 1 },
      },
    },
    { $sort: { numPersons: -1 } },
  ])
  .pretty();

// $isoweekyear operator

// push to array

//
db.friends
  .aggregate([
    { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } },
  ])
  .pretty();

// splits into multiple documents

db.friends
  .aggregate([
    { $unwind: '$hobbies' }, // an array to pullout elements
    { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } },
  ])
  .pretty();

// to eliminate duplicate values

db.friends
  .aggregate([
    { $unwind: '$hobbies' }, // an array to pullout elements
    { $group: { _id: { age: '$age' }, allHobbies: { $addToSet: '$hobbies' } } },
  ])
  .pretty();

// projection with array

db.friends
  .aggregate([
    { $project: { _id: 0, examScore: { $slice: ['$examScores', 2, 1] } } },
  ])
  .pretty();

// size of array

db.friends
  .aggregate([{ $project: { _id: 0, numScores: { $size: '$examScores' } } }])
  .pretty();

// filtering an array

db.friends
  .aggregate([
    {
      $project: {
        _id: 0,
        scores: {
          $filter: {
            input: '$examScores',
            as: 'sc', // for a local variable
            cond: { $gt: ['$$sc.score', 60] }, // one $ refers to field name two $$ refers to local variable
          },
        },
      },
    },
  ])
  .pretty();

// multiple operations on array

db.friends
  .aggregate([
    { $unwind: '$examScores' },
    { $project: { _id: 1, name: 1, age: 1, score: '$examScores.score' } },
    { $sort: { score: -1 } },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        maxScore: { $max: '$score' },
      },
    },
    { $sort: { maxScore: -1 } },
  ])
  .pretty();

// $bucket -> allows to output data in buckets

db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',
        boundaries: [18, 30, 40, 50, 60, 120],
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: '$dob.age' },
        },
      },
    },
  ])
  .pretty();

// $bucketAuto -> like bucket but boundaries are derived automatically based on no of buckets

db.persons
  .aggregate([
    {
      $bucketAuto: {
        groupBy: '$dob.age',
        buckets: 5,
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: '$dob.age' },
        },
      },
    },
  ])
  .pretty();

// additional operators

db.persons
  .aggregate([
    { $match: { gender: 'male' } },
    {
      $project: {
        _id: 0,
        gender: 1,
        name: { $concat: ['$name.first', ' ', '$name.last'] },
        birthdate: { $toDate: '$dob.date' },
      },
    },
    { $sort: { birthdate: 1 } },
    { $skip: 10 },
    { $limit: 10 },
  ])
  .pretty();

// writing pipeline results into collections

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: '$dob.age',
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
    { $out: 'transformedPersons' },
  ])
  .pretty();

// $geoNear should always be the first pipeline so that it can have direct access to data

db.transformedPersons
  .aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [-18.4, -42.8],
        },
        maxDistance: 1000000,
        num: 10,
        query: { age: { $gt: 30 } },
        distanceField: 'distance',
      },
    },
  ])
  .pretty();
