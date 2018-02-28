const { graphqlExpress } = require('apollo-server-express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

const { schema, context } = require('./schema');

const PORT = 3001;

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
