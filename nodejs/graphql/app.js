const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

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
  if (request.method === 'OPTIONS') {
    // to fix browser options error
    return response.sendStatus(200);
  }
  next();
});

// using graphql
// express-graphql automatically denies any request other than post
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(error) {
      // graphql executes this with error thrown
      if (!error.originalError) {
        // original error is set by graphql when there is any error
        return error;
      }
      return {
        error: error.originalError.data,
        message: error.message || 'Invalid Input',
      };
    },
  })
);

app.listen(8080, () => {
  console.log('Server started at 8080');
});
