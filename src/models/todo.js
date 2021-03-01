const todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
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
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.user);
  };

  return Todo;
};

module.exports = todo;
