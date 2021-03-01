const { gql } = require('apollo-server-express');

const todoSchema = gql`
  extend type Query {
    todo(id: ID!): Todo!
    todos: [Todo!]
  }

  extend type Mutation {
    addTodo(description: String!): Todo!
    deleteTodo(id: ID!): Todo!
    updateTodo(id: ID!, description: String!): Todo!
  }

  type Todo {
    id: ID!
    description: String!
    userId: User!
  }
`;

module.exports = todoSchema;
