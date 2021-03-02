'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Todo }) {
      this.hasMany(Todo, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 42],
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );

  User.findByLogin = async (login) => {
    const user = await User.findOne({
      where: { email: login },
    });

    return user;
  };
  return User;
};
