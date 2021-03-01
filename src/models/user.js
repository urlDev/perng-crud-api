const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
  });

  User.associate = (models) => {
    User.hasMany(models.todo, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async (login) => {
    const user = await User.findOne({
      where: { email: login },
    });

    return user;
  };

  return User;
};

module.exports = user;
