
//const database = require('../models')
//const Sequelize = require('sequelize')

const { PessoasServices } = require('../services')
const pessoasService = new PessoasServices() 

class PessoaController{
    static async PegaPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await pessoasService.PegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        }
        catch (error){
            return res.status(500).json(error.message)
        }
    }
    static async PegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await pessoasService.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        }
        catch (error){
            return res.status(500).json(error.message)
        }
    }
    static async PegaUmaPessoa(req, res) {
        const {id} = req.params

        try{
            const umaPessoa = await database.Pessoas.findOne(
                {
                    where: {id: Number(id)}
                })
                return res.status(200).json(umaPessoa)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)

            return res.status(200).json(novaPessoaCriada)

        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async atualizaPessoa(req, res){
        const {id} = req.params
        const novasInfos = req.body
        try{
            await database.Pessoas.update(novasInfos, {where: {id: Number (id) }})
            const pessoaAtualizada = await database.Pessoas.findOne( {where: {id: Number (id)}})
            return res.status(200).json(pessoaAtualizada)
        }catch(error){
            return res.status(500).json(error.message)
        }

    }
    static async apagaPessoa(req, res){
        const {id} = req.params
        try{
            await database.Pessoas.destroy({where: {id: Number (id) }})
            return res.status(200).json({message: `id ${id} deletado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraPessoa(req, res){
        const { id } = req.params
        try{
            await database.Pessoas.restore( {where: {id: Number(id)}})
            res.status(200).json({message: `id ${id} restaurado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async PegaUmaMatricula(req, res) {
        const { estudanteid, matriculaid } = req.params

        try{
            const umaMatricula = await database.Matriculas.findOne(
                {
                    where: {id: Number(matriculaid),
                    estudanteid: Number(estudanteid)
                    }
                })
                return res.status(200).json(umaMatricula)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async criaMatricula(req, res) {
        const { estudanteid } = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteid)}
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)

            return res.status(200).json(novaMatriculaCriada)

        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async atualizaMatricula(req, res){
        const { estudanteid, matriculaid } = req.params
        const novasInfos = req.body
        try{
            await database.Matriculas.update(novasInfos, {where: {id: Number (matriculaid), estudante_id: Number(estudanteid) }})
            const MatriculaAtualizada = await database.Matriculas.findOne( {where: {id: Number (matriculaid)}})
            return res.status(200).json(MatriculaAtualizada)
        }catch(error){
            return res.status(500).json(error.message)
        }

    }
    static async apagaMatricula(req, res){
        const { estudanteid, matriculaid } = req.params
        try{
            await database.Matriculas.destroy({where: {id: Number (matriculaid), estudante_id: Number(estudanteid) }})
            return res.status(200).json({message: `id ${estudanteid} e ${matriculaid} matricula deletados`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatricula(req, res){
        const { estudanteid } = req.params
        try{
            const pessoa = await database.Pessoas.findOne({where: { id: Number(estudanteid)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatriculaPorTurma(req, res){
        const { turmaid } = req.params
        try{
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({ where: {turma_id: Number(turmaid),
            status: 'Confirmado'}, limit: 20, order: [['estudante_id', 'DESC']]})
            return res.status(200).json(todasAsMatriculas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 2
        try{
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async cancelaPessoa(req, res){
        const { estudanteid } = req.params
        try{
            await pessoasService.cancelaPessoasEMatriculas(Number(estudanteid))
            return res.status(200).json({ message: `matriculas ref. a estudantes ${estudanteid} canceladas`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController