const { gql } = require('apollo-server-express');

const userSchema = gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): User!
    signIn(email: String!, password: String!): User!
    logOut: String!
    deleteUser: User!
    updateUser(email: String!, name: String!, password: String!): User!
  }

  type User {
    id: ID!
    uuid: ID!
    name: String!
    email: String!
    password: String!
    tokens: [String!]!
    todos: [Todo!]
  }
`;

module.exports = userSchema;
