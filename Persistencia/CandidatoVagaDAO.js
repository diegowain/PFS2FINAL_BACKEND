import CandidatoVaga from "../Modelo/candidatovaga.js"
import Candidato from "../Modelo/candidato.js"
import Vaga from "../Modelo/vaga.js"
import conectar from "./conexao.js"

export default class CandidatoVagaDAO{

    async gravar(candidatovaga) {
        //um pedido no banco de dados grava registro na tabela pedido e também na tabela pedido_produto
        if (candidatovaga instanceof CandidatoVaga) {
            const conexao = await conectar();
            //garantir a transação das operações para que seja realizada de forma atômica
            await conexao.beginTransaction();
            try {
                //inserir na tabela pedido
                const sql = 'INSERT INTO inscricao( data_pedido, horario_pedido, candidato_cpf, vaga_codigo) VALUES(str_to_date(?,"%d/%m/%Y"),?,?,?)';
                const parametros = [inscricao.candidato.cpf, inscricao.data, inscricao.horario];
                const retorno = await conexao.execute(sql, parametros);
                inscricao.codigo = retorno[0].insertId;
                //inserir na tabela item pedido
                const sql2 = 'INSERT INTO inscricoes(inscricao_codigo, candidato_codigo, data,horario) VALUES(?,?,?,?)';
                for (const item of pedido.itens) {
                    let parametros2 = [inscricao.codigo, candidato.codigo, inscricao.data, inscricao.horario];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit(); //se chegou até aqui sem erros, confirmaremos as inclusões
                global.poolConexoes.releaseConnection(conexao);
            }
            catch (error) {
                await conexao.rollback(); //voltar o banco de dados ao estado anterior
                throw error; //throw = lançar
            }
        }

    }



}