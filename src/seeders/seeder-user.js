'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING, */
    return queryInterface.bulkInsert('Users', [{
      username: 'Minh Trang',
      email: 'minhtrang.9096@gmail.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
