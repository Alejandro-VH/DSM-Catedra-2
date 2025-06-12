'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('books', [
      {
        title: 'Dune',
        author: 'Frank Herbert',
        genre: 'Ciencia ficción',
        publication_date: '1965-08-01',
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'eL PryncIpTo',
        author: 'Antoine de Saint-Exupéry',
        genre: 'Fábula',
        publication_date: '1943-04-06',
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
        genre: 'Ciencia ficción',
        publication_date: '1953-10-19',
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'El código Da Vinci',
        author: 'Dan Brown',
        genre: 'Misterio',
        publication_date: '2003-03-18',
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'La tregua',
        author: 'Mario Benedetti',
        genre: 'Romance / Drama',
        publication_date: '1960-03-01',
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Breves respuestas a las grandes preguntas',
        author: 'Stephen Hawking',
        genre: 'Divulgación científica',
        publication_date: '2018-10-16',
        available: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },


  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('books', null, {});
  }
};
