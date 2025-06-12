'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('loans', [
      {
        user_id: 1,
        book_id: 1,
        loan_date: '2023-06-01',
        return_date: '2023-06-15',
        status: 'devuelto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        book_id: 2,
        loan_date: '2025-06-05',
        return_date: '2025-06-20',
        status: 'prestado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        book_id: 3,
        loan_date: '2025-06-10',
        return_date: '2025-06-25',
        status: 'prestado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        book_id: 1,
        loan_date: '2025-04-01',
        return_date: '2025-04-15',
        status: 'con retraso',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('loans', null, {});
  }
};
