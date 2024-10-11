import Vaga from "../Modelo/vaga.js";
import conectar from "./conexao.js"

export default class VagaDAO{


    async incluir(vaga){

        if (vaga instanceof Vaga){
            const conexao = await conectar();
            const sql="INSERT INTO vaga(cargo, salario,cidade,quantidade ) \
                                           VALUES(?,?,?,?)";
            const valores = [vaga.cargo, vaga.salario, vaga.cidade, vaga.quantidade];                                        
            await conexao.query(sql,valores);
            global.poolConexoes.releaseConnection(conexao);
        }

    }

    async alterar(vaga){
        
        if (vaga instanceof Vaga){
            const conexao = await conectar();
            const sql="UPDATE vaga SET salario=?, cidade = ?,quantidade = ? \
                       WHERE cargo=?";
            const valores = [vaga.cargo, vaga.salario, vaga.cidade, vaga.quantidade];                                        
            await conexao.query(sql,valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(vaga){

        if (vaga instanceof Vaga){
            const conexao = await conectar();
            const sql="DELETE FROM vaga WHERE cargo=?";
            const valores = [vaga.cargo];                                        
            await conexao.query(sql,valores);
            global.poolConexoes.releaseConnection(conexao);
        } 

    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM vaga WHERE cargo LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaVaga = [];
        for(const row of rows){
            const vaga = new Vaga(row['cargo'],row['salario'],
            row['cidade'], row['quantidade']);
            listaVaga.push(vaga);
        }
        return listaVaga;
    }

    async consultarPeloCargo(cargo){
        const conexao = await conectar();
        const sql = "SELECT * FROM vaga WHERE cargo = ?";
        const valores = [cargo]
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaVaga = [];
        for(const row of rows){
            const vaga = new Vaga(row['cargo'],row['salario'],
            row['cidade'], row['quantidade']);
            listaVaga.push(candidato);
        }
        return listaVaga;
    }

}