require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schemas/index');
const resolvers = require('./resolvers/index');
const { sequelize, User, Todo } = require('../models');
const getMe = require('./utils/auth');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      User,
      Todo,
      secret: process.env.JWT_SECRET,
      me,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 App is listening on ${process.env.PORT}`);
  });
});
