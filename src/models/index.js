const Sequelize = require('sequelize');
const user = require('./user');
const todo = require('./todo');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  }
);

user(sequelize, Sequelize.DataTypes);
todo(sequelize, Sequelize.DataTypes);

// passing models together
const models = sequelize.models;

// Connecting associated models together for db operations
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { models, sequelize };
