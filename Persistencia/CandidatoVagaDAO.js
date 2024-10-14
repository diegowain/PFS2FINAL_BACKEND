import CandidatoVaga from "../Modelo/candidatovaga.js";
import conectar from "./conexao.js";

export default class CandidatoVagaDAO {

    async incluir(candidatoVaga) {
        if (candidatoVaga instanceof CandidatoVaga) {
            const conexao = await conectar();
            const sql = "INSERT INTO candidatovaga(data, horario, candidato_cpf, vaga_codigo) VALUES (?, ?, ?, ?)";
            const valores = [candidatoVaga.data, candidatoVaga.horario, candidatoVaga.candidatoCpf, candidatoVaga.vagaCodigo];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(candidatoVaga) {
        if (candidatoVaga instanceof CandidatoVaga) {
            const conexao = await conectar();
            const sql = "UPDATE candidatovaga SET data=?, horario=? WHERE candidato_cpf=? AND vaga_codigo=?";
            const valores = [candidatoVaga.data, candidatoVaga.horario, candidatoVaga.candidatoCpf, candidatoVaga.vagaCodigo];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidatoVaga) {
        if (candidatoVaga instanceof CandidatoVaga) {
            const conexao = await conectar();
            const sql = "DELETE FROM candidatovaga WHERE candidato_cpf=? AND vaga_codigo=?";
            const valores = [candidatoVaga.candidatoCpf, candidatoVaga.vagaCodigo];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM candidatovaga WHERE candidato_cpf LIKE ? OR vaga_codigo LIKE ?";
        const valores = ['%' + termo + '%', '%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        
        const listaCandidatoVaga = [];
        for (const row of rows) {
            const candidatoVaga = new CandidatoVaga(row['data'], row['horario'], row['candidato_cpf'], row['vaga_codigo']);
            listaCandidatoVaga.push(candidatoVaga);
        }
        return listaCandidatoVaga;
    }

    async consultarPeloCpfEVaga(candidatoCpf, vagaCodigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM candidatovaga WHERE candidato_cpf = ? AND vaga_codigo = ?";
        const valores = [candidatoCpf, vagaCodigo];
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        
        if (rows.length > 0) {
            const row = rows[0];
            return new CandidatoVaga(row['data'], row['horario'], row['candidato_cpf'], row['vaga_codigo']);
        }
        return null;  // Retorna null se não encontrar a associação
    }
}
