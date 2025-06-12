'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        name: 'Nicolas',
        last_name: 'Martinez',
        email: 'nicolas.martinez@ejemplo.com',
        password: bcrypt.hashSync('pass_123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carlos',
        last_name: 'Pérez',
        email: 'carlos.perez@ejemplo.com',
        password: bcrypt.hashSync('carlos1234', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fernanda',
        last_name: 'Muñoz',
        email: 'fernanda.munoz@ejemplo.com',
        password: bcrypt.hashSync('fernanda1234', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
