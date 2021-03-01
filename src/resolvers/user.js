const userResolvers = {
  Query: {
    me: async (parent, args, { me, models }) => {
      return await models.user.findByPk(me.id);
    },
    users: async (parent, args, { models }) => {
      try {
        return await models.user.findAll();
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    signUp: async (parent, { email, password, name }, { models }) => {
      try {
        const user = await models.user.create({
          email,
          name,
          password,
        });

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = userResolvers;
