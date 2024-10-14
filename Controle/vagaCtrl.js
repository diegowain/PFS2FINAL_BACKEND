import Vaga from "../Modelo/vaga.js";

export default class VagaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo || 0;  // Adiciona o código, mas inicia com 0 se não informado
            const cargo = dados.cargo;
            const salario = dados.salario;
            const cidade = dados.cidade;
            const quantidade = dados.quantidade;
            if (cargo && salario && cidade && quantidade) {
                const vaga = new Vaga(codigo, cargo, salario, cidade, quantidade);
                vaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar vaga: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da vaga corretamente!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma vaga!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const cargo = dados.cargo;
            const salario = dados.salario;
            const cidade = dados.cidade;
            const quantidade = dados.quantidade;

            if (codigo && cargo && salario && cidade && quantidade) {
                const vaga = new Vaga(codigo, cargo, salario, cidade, quantidade);
                vaga.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Vaga atualizada com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretamente conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou vaga no formato JSON não fornecida! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const vaga = new Vaga(codigo);
                vaga.removerDoBancoDados().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Vaga excluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o código da vaga conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou vaga no formato JSON não fornecida! Consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const vaga = new Vaga();
            vaga.consultar('').then((vaga) => {
                resposta.status(200).json({
                    status: true,
                    listaVaga: vaga
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }

    consultarPeloCargo(requisicao, resposta) {
        resposta.type("application/json");

        const cargo = requisicao.params['cargo'];

        if (requisicao.method === "GET") {
            const vaga = new Vaga();
            vaga.consultarCargo(cargo).then((vaga) => {
                resposta.status(200).json({
                    status: true,
                    listaVaga: vaga
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }
}
