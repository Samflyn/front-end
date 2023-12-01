// ODM -> Object Document Mapping

const mongoose = require('mongoose');

exports.mongooseConnect = mongoose.connect('mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bcrypt = require('bcryptjs');

bcrypt
  .hash('password here', 12)
  .then((hashedPassword) => {
    console.log(hashedPassword);
  })
  .catch((error) => {
    console.log(error);
  });

bcrypt
  .compare('password here', 'hashed here')
  .then((result) => {
    if (result) console.log('passwords match');
  })
  .catch((error) => console.log(error));

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  name: {
    type: String,
    required: true,
  },
  desc: String,
  age: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //model of referenced
    required: true,
  },
});

exports.Product = mongoose.model('Product', productSchema);
