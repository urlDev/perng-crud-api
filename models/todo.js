'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // Adding foreign key so that we can manipulate it how we want
      // Otherwise, sequelize puts it like UserId
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Todo.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description can't be empty",
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'todos',
      modelName: 'Todo',
    }
  );
  return Todo;
};
