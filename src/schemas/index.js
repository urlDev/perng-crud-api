const { gql } = require('apollo-server-express');

const todoSchema = require('./todo');
const userSchema = require('./user');

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, todoSchema];
