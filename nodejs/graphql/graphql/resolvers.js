// function should be same as query
// promises should be returned, as graphql wont wait for it
// but using await automatically returns
// validations should be done in resolvers
const data = [];
const validator = require('validator');

module.exports = {
  hello() {
    return {
      text: 'test data string',
      views: 1234,
    };
  },
  createData(args, request) {
    if (validator.default.isEmpty(args.userData.name)) {
      const error = new Error('Invalid input');
      error.data = 'Invalid Name';
      throw error;
    }
    data.push(args.userData);
    return { ...args.userData, _id: '1' };
  },
};
