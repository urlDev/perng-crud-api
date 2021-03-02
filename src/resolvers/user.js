const userResolvers = {
  Query: {
    me: async (parent, args, { me, User }) => {
      return await User.findByPk(me.id);
    },
  },

  Mutation: {
    signUp: async (parent, { email, password, name }, { User }) => {
      try {
        const user = await User.create({
          email,
          name,
          password,
        });

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (parent, args, { me, User, Todo }) => {
      try {
        const user = await User.findOne({ where: { uuid: me.uuid } });

        // delete all the todos that belongs to the user
        await Todo.destroy({ where: { userId: me.id } });

        await user.destroy();

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser: async (parent, { name, email, password }, { me, User }) => {
      try {
        let user = await User.findOne({ where: { uuid: me.uuid } });

        user.name = name;
        user.email = email;
        user.password = password;

        await user.save();

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = userResolvers;
