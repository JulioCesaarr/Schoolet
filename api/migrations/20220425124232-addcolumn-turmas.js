'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Turmas', 'deletedAt',  {
      
        allowNull: true,
        type: Sequelize.DATE
    })},  
  down: (queryInterface, Sequelize) => {
    return queryInterface.RemoveColumn('Turmas', 'deletedAt');
  }
};