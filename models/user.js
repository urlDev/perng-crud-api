'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      this.hasMany(model.Todo, { foreignKey: 'userId' });
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
      tokens: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generateAuthToken = async function () {
    const token = jwt.sign(
      { uuid: this.uuid, id: this.id, email: this.email, name: this.name },
      process.env.JWT_SECRET
    );

    this.tokens = [...this.tokens, token];

    await this.save();

    return token;
  };

  User.prototype.generatePasswordHash = async function () {
    return await bcrypt.hash(this.password, 10);
  };

  User.prototype.validatePassword = async function (password) {
    console.log(password);
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
