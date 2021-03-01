require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schemas/index');
const resolvers = require('./resolvers/index');
const { models, sequelize } = require('./models/index');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async (req) => {
    return {
      models,
      // me: await models.user.findByLogin('Can Ural'),
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 App is listening on ${process.env.PORT}`);
  });
});
