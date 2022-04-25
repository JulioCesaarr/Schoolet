'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matriculas = sequelize.define('Matriculas', {
    status: DataTypes.STRING
  }, { paranoid: true });
  Matriculas.associate = function(models) {
    Matriculas.belongsTo(models.Pessoas, {
      foreignkey: 'estudante_id'
    })
    Matriculas.belongsTo(models.Turmas, {
      foreignkey: 'turmas_id'
    })
  };
  return Matriculas;
};