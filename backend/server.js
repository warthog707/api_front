import express, { response } from "express";

const app = express();
const porta = 8000;
// --- bd* ---

let usuarios = [];
let idAtual = 1;

// ---    ---

// --- middleware ---

// converter todo* .json para .js
app.use(express.json())

// ---            ---

app.get("/",(request,response) => {
    response.send("API rodando");
});


//GET /usuarios
//metodo: GET
//descricao: Retorna todos os usuarios cadastrados

app.get("/usuarios",(request,response) =>{
    //select all*
    response.json(usuarios);
});


//GET /usuarios/:id
//metodo: GET
//descricao: retorna um usuario especifico pelo ID

app.get("/usuarios/:id",(request,response) =>{
    //request do id
    const id = parseInt(request.params.id);

    // u == elemento no usuarios
    // u só para exemplificar usuario, poderia colocar usuario ou outro nome
    const usuario = usuarios.find(u => u.id === id);

    //se o usuario nao existir => erro
    if (!usuario)
        return response.status(404).json({mensagem:"usuario nao encontrado"});
    
    //se o usuario existir => mostra o usuario
    response.json(usuario);

});


//POST /usuarios
// metodo: POST
//descricao: cria um novo usuario
//recebe:{nome:string,email:string}

app.post("/usuarios",(request,response)=>{
   const nome = request.body.nome;
   const email = request.body.email; 

   if(!nome || !email || nome == "" || email == "")
        return response.status(404).json({menssagem:"nome e email obrigatorios"});
});


app.listen(porta,(request,response) =>{
    console.log(`servidor rodando: http://127.0.0.1:${porta}`);
});