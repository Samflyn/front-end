//ORM -> Object Relational Mapping

const User = require('./models/user');

User.create({
  name: 'sam',
  password: 'root',
  about: 'description',
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//always returns array
User.findAll()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

User.findByPk(2).then().catch();

User.findByPk(4)
  .then((user) => {
    user.name = 'sam';
    user.password = 'root';
    user.about = 'updating now...';
    return user.save();
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
