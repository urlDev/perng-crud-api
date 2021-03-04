const todoResolvers = {
  Query: {
    todos: async (parent, args, { me, Todo }) => {
      try {
        const todos = await Todo.findAll({ where: { userId: me.id } });

        return todos;
      } catch (error) {
        throw new Error(error);
      }
    },
    todo: async (parent, { uuid }, { me, Todo }) => {
      try {
        const todo = await Todo.findOne({ where: { uuid, userId: me.id } });
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
          userId: me.id,
        });

        return todo;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTodo: async (parents, { id, description }, { me, Todo }) => {
      try {
        let todo = await Todo.findOne({ where: { id, userId: me.id } });

        todo.description = description;

        await todo.save();
        return todo;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteTodo: async (parents, { id }, { me, Todo }) => {
      try {
        const todo = await Todo.findOne({ where: { id, userId: me.id } });

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
        const user = await User.findOne({ where: { id: me.id } });

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = todoResolvers;
