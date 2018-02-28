const { graphqlExpress } = require('apollo-server-express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const isemail = require('isemail');

app.use(cors());

const { schema, context } = require('./schema');

const PORT = 3001;

/**
 *  Mock Authentication Middleware
 */
app.use((req, res, next) => {
  const auth = req.headers.authorization || '';
  const email = new Buffer(auth, 'base64').toString('ascii');

  if (isemail.validate(email)) {
    req.email = email
  }

  return next();
});


app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    // GraphQL’s data schema
    schema,
    // Pretty Print the JSON response
    pretty: true,
    // Enable GraphiQL dev tool
    graphiql: true,
    tracing: true,
    context: context(req)
  }))
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
