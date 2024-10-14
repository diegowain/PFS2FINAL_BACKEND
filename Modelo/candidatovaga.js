
import CandidatoVagaDAO from "../Persistencia/CandidatoVagaDAO.js";

export default class CandidatoVaga {

   #data;
   #horario;
   #candidatoCpf;  // chave estrangeira
   #vagaCodigo;    // chave estrangeira

    constructor(data, horario, candidatoCpf, vagaCodigo) {
        this.#data = data;
        this.#horario = horario;
        this.#candidatoCpf = candidatoCpf;
        this.#vagaCodigo = vagaCodigo;
    }

    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    get horario() {
        return this.#horario;
    }

    set horario(novoHorario) {
        this.#horario = novoHorario;
    }

    get candidatoCpf() {
        return this.#candidatoCpf;
    }

    set candidatoCpf(novoCpf) {
        this.#candidatoCpf = novoCpf;
    }

    get vagaCodigo() {
        return this.#vagaCodigo;
    }

    set vagaCodigo(novoCodigo) {
        this.#vagaCodigo = novoCodigo;
    }

    toJSON() {
        return {
            "data": this.#data,
            "horario": this.#horario,
            "candidatoCpf": this.#candidatoCpf,
            "vagaCodigo": this.#vagaCodigo
        };
    }

    // Gravar nova associação
    async gravar() {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        await candidatoVagaDAO.incluir(this);
    }

    // Atualizar associação existente
    async atualizar() {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        await candidatoVagaDAO.alterar(this);
    }

    // Remover associação do banco de dados
    async removerDoBanco() {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        await candidatoVagaDAO.excluir(this);
    }

    // Consultar todas as associações
    async consultar(termo) {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        return await candidatoVagaDAO.consultar(termo);
    }

    // Consultar associação específica pelo CPF e código da vaga
    async consultarPeloCpfEVaga(cpf, codigo) {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        return await candidatoVagaDAO.consultarPeloCpfEVaga(cpf, codigo);
    }
}
