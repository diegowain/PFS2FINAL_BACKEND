import Candidato from "../Modelo/candidato.js"
import Vaga from "../Modelo/vaga.js"
import CandidatoVaga from "../Modelo/candidatovaga.js"


export default class CandidatoVagaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { data, horario, candidatoCpf, vagaCodigo } = dados;

            if (data && horario && candidatoCpf && vagaCodigo) {
                // Valida se o candidato e a vaga existem
                const candidato = new Candidato();
                const vaga = new Vaga();

                Promise.all([
                    candidato.consultarCpf(candidatoCpf), 
                    vaga.consultarCodigo(vagaCodigo)
                ])
                .then(([candidatoExistente, vagaExistente]) => {
                    if (!candidatoExistente) {
                        throw new Error("Candidato não encontrado");
                    }
                    if (!vagaExistente) {
                        throw new Error("Vaga não encontrada");
                    }

                    const candidatoVaga = new CandidatoVaga(data, horario, candidatoCpf, vagaCodigo);
                    return candidatoVaga.gravar();  // Chama o método de gravação
                })
                .then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Associação Candidato/Vaga incluída com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao registrar associação: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, informe todos os dados da associação (data, horário, candidatoCpf, vagaCodigo)!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método POST para cadastrar uma associação!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { data, horario, candidatoCpf, vagaCodigo } = dados;

            if (data && horario && candidatoCpf && vagaCodigo) {
                const candidatoVaga = new CandidatoVaga(data, horario, candidatoCpf, vagaCodigo);
                candidatoVaga.atualizar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Associação Candidato/Vaga atualizada com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao atualizar associação: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados da associação (data, horário, candidatoCpf, vagaCodigo)!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou dados no formato JSON não fornecidos!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const { candidatoCpf, vagaCodigo } = requisicao.body;

            if (candidatoCpf && vagaCodigo) {
                const candidatoVaga = new CandidatoVaga(null, null, candidatoCpf, vagaCodigo);
                candidatoVaga.removerDoBanco()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Associação Candidato/Vaga excluída com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao excluir associação: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o candidatoCpf e o vagaCodigo para excluir a associação!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou dados no formato JSON não fornecidos!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'GET') {
            const candidatoVaga = new CandidatoVaga();
            candidatoVaga.consultar('')
                .then((associacoes) => {
                    resposta.status(200).json({
                        status: true,
                        listaCandidatoVaga: associacoes
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }

    consultarPeloCpfEVaga(requisicao, resposta) {
        resposta.type('application/json');
        const { candidatoCpf, vagaCodigo } = requisicao.params;

        if (requisicao.method === 'GET') {
            const candidatoVaga = new CandidatoVaga();
            candidatoVaga.consultarPeloCpfEVaga(candidatoCpf, vagaCodigo)
                .then((associacao) => {
                    resposta.status(200).json({
                        status: true,
                        candidatoVaga: associacao
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API."
            });
        }
    }
}
