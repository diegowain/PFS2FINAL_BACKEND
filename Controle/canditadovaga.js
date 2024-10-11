import Candidatado from "../Modelo/candidato.js"
import Vaga from "../Modelo/vaga.js"
import CandidatoVaga from "../Modelo/candidatovaga.js"

export default class CandidatoVaga{

    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            //extraindo dados de um novo pedido
            const candidato = dados.candidato;
            const dataInscricao = new Date(dados.dataInscricao).toLocaleDateString();
            const horarioInscricao = dados.horarioInscricao;
            
            const candidatosvaga = dados.inscricao;
            //instanciando um objeto do tipo Pedido
            const objCandiato = new Candidato(candidato.cpf);
            //instanciando uma lista de objetos do tipo ItensPedido
            let inscricao = [];
            for (const incricoes of candidatovaga){
                //instanciando um objeto do tipo Produto
                const vaga = new Vaga(vaga.codigo);
                //instanciando um objeto do tipo ItemPedido
                const objCandVaga = new CandidatoVaga(vaga, candidatovaga.dataInscricao, candidatovaga.horarioInscricao);
                inscricao.push(objCandVaga);
            }
            const candidatovaga = new CandidatoVaga(0,objVaga, dataInscricao,horarioInscricao, inscricao);
            //resolver a promise
            inscricao.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Inscrição registrada com sucesso!",
                    "codigo": inscricao.codigo
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar inscrição: " + erro.message
                });
            });
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }
        
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');  
        if (requisicao.method === 'GET'){
            //tentar obter o código do pedido a partir dos parâmetros da URL 
            let termo = requisicao.params.termo;
            /*if (!isNaN(termo)){*/
            const candidatosvaga = new CandidatoVaga(0);
            candidatosvaga.consultar(termo).then((listaInscricoes)=>{
                resposta.status(200).json({
                    "status": true,
                    "listaInscricoes": listaInscricoes
                })
            })
            .catch((erro)=>{
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o inscrição: " + erro.message
                });
            });
            /*}
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um códido de pedido válido!"
                });
            }*/
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }     
    }

}