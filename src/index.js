require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schemas/index');
const resolvers = require('./resolvers/index');
const { sequelize, User, Todo } = require('../models');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async (req) => {
    return {
      User,
      Todo,
      me: await User.findByLogin('can@can.com'),
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 App is listening on ${process.env.PORT}`);
  });
});
