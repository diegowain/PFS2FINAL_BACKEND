import  Candidato from "../Modelo/candidato.js"

export default class CandidatoCtrl{

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const telefone = dados.telefone
            if (cpf && nome && endereco && telefone) {
                const candidato = new Candidato(cpf, nome, endereco, telefone );
                //resolver a promise
                candidato.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        
                        "mensagem": "Candidato incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar candidato:" + erro.message
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
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const telefone = dados.telefone;

            if(cpf && nome && endereco &&  telefone )
            {
                //gravar esse cliente
                const candidato = new Candidato(cpf, nome, endereco, telefone);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um cliente no banco de dados
                candidato.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Candidato atualizado com sucesso!"
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
                    mensagem:"Informe adequadamente todos os dados de um Candidato conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou Candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf)
            {
                //gravar esse cliente
                const candidato = new Candidato(cpf);
                //método assíncrono removerDoBanco que instancia a camada de persistência e
                //grava um cliente no banco de dados
                candidato.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Candidato excluído com sucesso!"
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
                    mensagem:"Informe cpf do candidato conforme documentação da API!"
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
            const candidato = new Candidato();
            //método assíncrono que recupera os clientes do banco dados
            candidato.consultar('').then((candidato)=>{
                    resposta.status(200).json({
                        status:true,
                        listaCandidato:candidato
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
    consultarCpf(requisicao, resposta){
        resposta.type("application/json");
        
        const cpf = requisicao.params['cpf'];
        
        if(requisicao.method === "GET"){
            const candidato = new Candidato();
            //método assíncrono que recupera os clientes do banco dados
            candidato.consultarCpf(cpf).then((candidato)=>{
                    resposta.status(200).json({
                        status:true,
                        listaCandidato:candidato
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