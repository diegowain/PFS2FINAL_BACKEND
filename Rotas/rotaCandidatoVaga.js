import { Router } from "express";
import CandidatoVagaCtrl from "../Controle/candidatovaga.js";

const rotaCandidatoVaga = new Router();
const candidatoVagaCtrl = new CandidatoVagaCtrl();

rotaCandidatoVaga
    .post('/', candidatoVagaCtrl.gravar)            // Rota para criar uma nova associação de Candidato com Vaga
    .put('/', candidatoVagaCtrl.atualizar)          // Rota para atualizar uma associação existente
    .delete('/', candidatoVagaCtrl.excluir)         // Rota para excluir uma associação existente
    .get('/', candidatoVagaCtrl.consultar)          // Rota para consultar todas as associações de Candidato e Vaga
    .get('/:cpf/:vagaCodigo', candidatoVagaCtrl.consultarPeloCpfEVaga);  // Rota para consultar associação específica pelo CPF do candidato e código da vaga

export default rotaCandidatoVaga;
