'use strict';
module.exports = (sequelize, DataTypes) => {
  const Turmas = sequelize.define('Turmas', {
    data_inicio: DataTypes.DATEONLY
  }, { paranoid: true });
  Turmas.associate = function(models) {
    Turmas.hasMany(models.Matriculas, {
      foreignkey: 'turmas_id'
    })
    Turmas.belongsTo(models.Pessoas, {
      foreignkey: 'docente_id'
    });
    Turmas.belongsTo(models.Niveis, {
      foreignkey: 'nivel_id'
    });
  };
  return Turmas;
};