import express from 'express';
import cors from 'cors';
import rotaCandidato from './Rotas/rotaCandidato.js';
import rotaVaga from './Rotas/rotaVaga.js';
import rotaCandidatoVaga from './Rotas/rotaCandidatoVaga.js';



const host='0.0.0.0';
const porta=4000;

const app = express();


app.use(cors({
    credentials: true, //middleware para passar “Access-Control-Allow-Credentials” no cabeçalho das requisições.
    origin: ["http://localhost:3000","http://192.168.0.101:3000"],
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/candidato',rotaCandidato);
app.use('/vaga',rotaVaga);
app.use('/inscricoes',rotaCandidatoVaga);



app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})