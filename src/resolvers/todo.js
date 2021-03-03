const todoResolvers = {
  Query: {
    todos: async (parent, args, { me, Todo }) => {
      return await Todo.findAll({ where: { userId: me.id } });
    },
    todo: async (parent, { uuid }, { me, Todo }) => {
      try {
        const todo = await Todo.findOne({ where: { uuid } });
        return todo;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    addTodo: async (parents, { description }, { me, User, Todo }) => {
      try {
        const todo = await Todo.create({
          description,
        });

        return todo;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTodo: async (parents, { id, description }, { me, Todo }) => {
      try {
        let todo = await Todo.findOne({ where: { id } });

        todo.description = description;

        await todo.save();
        return todo;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteTodo: async (parent, { id }, { me, Todo }) => {
      try {
        const todo = await Todo.findOne({ where: { id } });

        await todo.destroy();

        return todo;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Todo: {
    userId: async (parent, args, { me, User }) => {
      try {
        const user = await User.findOne({ where: { uuid: me.uuid } });

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = todoResolvers;
