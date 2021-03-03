const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');

const createToken = async ({ id, name, email }, secret, expiresIn) => {
  return await jwt.sign({ id, name, email }, secret, { expiresIn });
};

const userResolvers = {
  Query: {
    me: async (parent, args, { me, User }) => {
      return await User.findByPk(me.id);
    },
  },

  Mutation: {
    signUp: async (parent, { email, password, name }, { secret, User }) => {
      try {
        const user = await User.create({
          email,
          name,
          password,
        });

        const token = await createToken(user, secret, '1h');

        return { token };
      } catch (error) {
        throw new Error(error);
      }
    },
    signIn: async (parent, { email, password }, { me, User, secret }) => {
      try {
        const user = await User.findByLogin(email);

        if (!user) {
          throw new UserInputError('No user found');
        }

        const isValid = await user.validatePassword(password);

        if (!isValid) {
          throw new AuthenticationError('Could not authenticate');
        }

        const token = await createToken(user, secret, '1h');

        return { token };
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (parent, args, { me, User, Todo }) => {
      try {
        const user = await User.findOne({ where: { id: me.id } });

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
