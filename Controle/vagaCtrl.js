import  Vaga from "../Modelo/vaga.js"

export default class VagaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cargo = dados.cargo;
            const salario = dados.salario;
            const cidade = dados.cidade;
            const quantidade = dados.quantidade;
            if (cargo && salario && cidade && quantidade) {
                const vaga = new Vaga(0, cargo,salario,cidade,quantidade);
                //resolver a promise
                vaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        
                        "mensagem": "Vaga incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar vaga:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o cpf do candidato!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um candidato!"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            
            const cargo = dados.cargo;
            const salario = dados.salario;
            const cidade = dados.cidade;
            const quantidade = dados.quantidade;

            if( cargo && salario &&  cidade && quantidade )
            {
                //gravar esse cliente
                const vaga = new Vaga(cargo,salario,cidade,quantidade);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um cliente no banco de dados
                vaga.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Vaga atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados da vaga conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou vaga no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cargo = dados.cargo;
            if(cargo)
            {
                //gravar esse cliente
                const vaga = new Vaga(cargo);
                //método assíncrono removerDoBanco que instancia a camada de persistência e
                //grava um cliente no banco de dados
                vaga.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Vaga excluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe cargo da vaga conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "GET"){
            const vaga = new Vaga();
            //método assíncrono que recupera os clientes do banco dados
            vaga.consultar('').then((vaga)=>{
                    resposta.status(200).json({
                        status:true,
                        listaVaga:vaga
                    });
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }

    //alguém poderá fazer a seguinte requisição:
    //GET http://localhost:3000/clientes/111.111.111-11
    consultarPeloCargo(requisicao, resposta){
        resposta.type("application/json");
        
        const cargo = requisicao.params['cargo'];
        
        if(requisicao.method === "GET"){
            const vaga = new Vaga();
            //método assíncrono que recupera os clientes do banco dados
            vaga.consultarCargo(cargo).then((vaga)=>{
                    resposta.status(200).json({
                        status:true,
                        listaVaga:vaga
                    });
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }



}