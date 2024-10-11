import CandidatoDAO from "../Persistencia/CandidatoDAO.js"

export default class Candidato{

   #cpf;
   #nome;
   #endereco;
   #telefone;

    constructor(cpf, nome,endereco, telefone){
        this.#cpf= cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#telefone = telefone;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        //regra de negócio que impede que clientes existam com nomes vazios
            this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }


    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTel){
        this.#telefone = novoTel;
    }

    toJSON(){
        return {
            "cpf"      : this.#cpf,
            "nome"     : this.#nome,
            "endereco" : this.#endereco,
            "telefone" : this.#telefone,
  
        }
    }

    async gravar(){
        const candDAO = new CandidatoDAO();
        await candDAO.incluir(this);
    }

    async atualizar() {
        const candDAO = new CandidatoDAO();
        await candDAO.alterar(this);
    }

    async removerDoBancoDados() {
        const candDAO = new CandidatoDAO();
        await candDAO.excluir(this);
    }


    async consultar(termo){
        const candDAO = new CandidatoDAO();
        const candidato = await candDAO.consultar(termo);
        return candidato;
    }

    async consultarCargo(cpf){
        const candDAO = new CandidatoDAO();
        const candidato = await candDAO.consultarCpf(cpf);
        return candidato;
    }

 




}