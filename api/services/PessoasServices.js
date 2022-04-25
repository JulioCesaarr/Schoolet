const Services = require('./Services')
const database = require('../models')



class PessoasServices extends Services {
    constructor(){
        super('Pessoas'),
        this.matriculas = new Services('Matriculas')
    }
    
    async PegaRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({ where: {...where }  })
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].scope('todos').findAll({ where: {...where }  })
    }

    async cancelaPessoasEMatriculas(estudanteid){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false }, estudanteid, {transaction: transacao } )
            await this.Matriculas.atualizaRegistro({status: 'cancelado'}, {estudante_id: estudanteid},
             {transaction: transacao })
        })
    }


}

module.exports = PessoasServices