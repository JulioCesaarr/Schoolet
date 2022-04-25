'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type: DataTypes.STRING,
      Validate: {
        funcaoValidadora: function(dado) {
          if(dado.lenght < 3) throw new Error('o nome campo deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
     type: DataTypes.STRING,
     Validate: {
       isEmail: {
         args: true, 
         msg: 'dados do tipo Email invalidos'
       }
     }
  },
    role: DataTypes.STRING
  }, { paranoid: true,
    defaultScope: {
      where: { ativo: true}
    },
    scopes: {
      todos: { where: {} },
      //etc: { constraint: valor }
    }
    },
    );
    Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignkey: 'docente_id'
    })
    Pessoas.hasMany(models.Matriculas, {
      foreignkey: 'estudante_id',
      scope: { status: 'Confirmado' },
      as: 'aulasMatriculadas'
    })
  };
  return Pessoas;
};