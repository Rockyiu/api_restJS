"use strict";const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up (queryInterface) {

     return queryInterface.bulkInsert(
      'users',
       [{
       nome: 'Vinicius',
       email: 'teste@teste.com',
       password_hash: await bcryptjs.hash('123456', 8),
       created_at: new Date(),
       updated_at: new Date(),
      }], {});

  },

 down () {
  }
};
