require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const getMe = async (req) => {
  const token = req.headers['authentication'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new AuthenticationError('Your session expired');
    }
  }
};

module.exports = getMe;
