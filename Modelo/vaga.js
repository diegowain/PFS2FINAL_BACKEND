import VagaDAO from "../Persistencia/VagaDAO.js"

export default class Vaga{

   #cargo;
   #salario;
   #cidade;
   #quantidade;

    constructor(cargo, salario,cidade, quantidade){
        this.#cargo= cargo;
        this.#salario = salario;
        this.#cidade = cidade;
        this.#quantidade = quantidade;
    }

    get cargo(){
        return this.#cargo;
    }

    set cargo(novoCargo){
        this.#cargo = novoCargo;
    }

    get salario(){
        return this.#salario;
    }

    set salario(novoNome){
        //regra de negócio que impede que clientes existam com nomes vazios
            this.#salario = novoSalario;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novoCidade){
        this.#cidade = novoCidade;
    }


    get quantidade(){
        return this.#quantidade;
    }

    set quantidade(novoQtd){
        this.#quantidade = novoQtd;
    }

    toJSON(){
        return {
            "cargo"      : this.#cargo,
            "salario"     : this.#salario,
            "cidade" : this.#cidade,
            "quantidade" : this.#quantidade,
  
        }
    }

    async gravar(){
        const vagaDAO = new VagaDAO();
        await vagaDAO.incluir(this);
    }

    async atualizar() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.alterar(this);
    }

    async removerDoBancoDados() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.excluir(this);
    }


    async consultar(termo){
        const vagaDAO = new VagaDAO();
        const vaga = await vagaDAO.consultar(termo);
        return vaga;
    }

    async consultarCargo(cargo){
        const vagaDAO = new CandidatoDAO();
        const vaga = await vagaDAO.consultarCargo(cargo);
        return vaga;
    }

 




}