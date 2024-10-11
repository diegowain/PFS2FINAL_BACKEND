import CandidatoVagaDAO from "../Persistencia/CandidatoVagaDAO.js";
export default class CandidatoVaga {
    #dataInscricao;
    #horarioInscricao;
    #cpf;
    
    #codigo;

    constructor(dataInscricao, horarioInscricao, cpf, codigo) {
        this.#dataInscricao = dataInscricao;
        this.#horarioInscricao = horarioInscricao;
        this.#cpf = cpf;
        this.#codigo = codigo;
        
  
    }

    // Métodos de acesso (get) e modificação (set)

    // Código

    // Código do Cliente
    get dataInscricao() {
        return this.#dataInscricao;
    }

    set dataInscricao(novaData) {
        this.#dataInscricao = novaData;
        
    }

    // Data
    get horarioInscricao() {
        return this.#horarioInscricao;
    }

    set horarioInscricao(novoHorario) {
        this.#horarioInscricao = novoHorario;
    }

    // Total do Pedido
    get cpf() {
        return this.#cpf;
    }

    set cpf(novoTotal) {
        this.#cpf = novoCpf;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }
    // Produtos

    // JSON
    toJSON() {
        return {
            'dataInscricao': this.dataInscricao,
            'horarioInscricao': this. #horarioInscricao,
            'cpf': this.cpf,
            'codigo': this.#codigo


        };
    }

    async gravar() {
        const candidatovagaDAO = new CandidatoVagaDAO();
        this.codigo = await candidatovagaDAO.gravar(this);
    }

    async atualizar() {
        const candidatovagaDAO = new CandidatoVagaDAO();
        await candidatovagaDAO.alterar(this);
    }

    async apagar() {
        const candidatovagaDAO = new CandidatoVagaDAO();
        await candidatovagaDAO.deletar(this);
    }

    async consultar(termoBusca) {
        const candidatovagaDAO = new CandidatoVagaDAO();
        const listaInscricoes = await candidatovagaDAO.consultar(termoBusca);
        return listaInscricoes;
    }
    
}