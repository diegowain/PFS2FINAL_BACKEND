import Candidato from "../Modelo/candidato.js";
import conectar from "./conexao.js";

export default class CandidatoDAO {
  async incluir(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO candidato(cpf,nome,endereco,telefone ) VALUES(?,?,?,?)";
      const valores = [
        candidato.cpf,
        candidato.nome,
        candidato.endereco,
        candidato.telefone,
      ];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async alterar(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql =
        "UPDATE candidato SET nome=?, endereco = ?,telefone = ? \
                       WHERE cpf=?";
      const valores = [
        candidato.nome,
        candidato.endereco,
        candidato.telefone,
        candidato.cpf,
      ];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = "DELETE FROM candidato WHERE cpf=?";
      const valores = [candidato.cpf];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM candidato WHERE nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);
    const listaCandidato = [];
    for (const row of rows) {
      const candidato = new Candidato(
        row["cpf"],
        row["nome"],
        row["endereco"],
        row["telefone"]
      );
      listaCandidato.push(candidato);
    }
    return listaCandidato;
  }

  async consultarCpf(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM candidato WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);
    const listaCandidato = [];
    for (const row of rows) {
      const candidato = new Candidato(
        row["cpf"],
        row["nome"],
        row["endereco"],
        row["telefone"]
      );
      listaCandidato.push(candidato);
    }
    return listaCandidato;
  }
}
