const todoResolvers = {
  Query: {
    todos: async (parent, args, { models }) => {
      return await models.todo.findAll();
    },
  },

  Mutation: {
    addTodo: async (parents, { description }, { me, models }) => {
      try {
        return await models.todo.create({
          description,
          userId: me.id,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = todoResolvers;
