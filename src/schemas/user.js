const { gql } = require('apollo-server-express');

const userSchema = gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
    deleteUser: User!
    updateUser(email: String!, name: String!, password: String!): User!
  }

  type User {
    id: ID!
    uuid: ID!
    name: String!
    email: String!
    password: String!
    todos: [Todo!]
  }

  type Token {
    token: String!
  }
`;

module.exports = userSchema;
