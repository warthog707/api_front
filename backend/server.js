import express, { request, response } from "express";
import cors from "cors";

const app = express();
const porta = 8000;
// --- bd* ---

let usuarios = [];
let idAtual = 1;

// ---    ---


// --- middleware ---

// converter todo* .json para .js
app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

// ---            ---


app.get("/",(request,response) => {
    response.send("API rodando");
});


//GET /usuarios
//método: GET
//descrição: Retorna todos os usuarios cadastrados

app.get("/usuarios",(request,response) =>{
    //select all*
    response.json(usuarios);
});


//GET /usuarios/:id
//método: GET
//descrição: retorna um usuario especifico pelo ID

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
 //método: POST
 //descrição: cria um novo usuario
 //recebe:{nome:string,email:string}

app.post("/usuarios",(request,response)=>{
 //pega as informaçoes do usuario

   const nome = request.body.nome;
   const email = request.body.email; 

 //validaçao do usuario

   if(!nome || !email || nome == "" || email == "")
        return response.status(404).json({menssagem:"nome e email obrigatórios"});

 //criaçao objeto
    const novoUsuario = {
        //adiciona +1 no id para todo usuario criado
        id:idAtual++,
        nome:nome,
        email:email,
    };

 //adiciona objeto/usuario no vetor
    usuarios.push(novoUsuario);

 //status - feito a criaçao de um recurso - um *mini alerta
    response.status(201).json(novoUsuario);

});

 //PUT /usuarios/:id
 //método: put
 //descrição: atualiza um usuario existente COMPLETAMENTE - todos os campos
 //recebe: { nome: string, email:string}
 //parâmetro: id
app.put("/usuarios/:id",(request,response) =>{
    //pega o id da url e converte para int - request.params.id = /:id 
    const id = parseInt(request.params.id);
    //pega nome e email do objeto
    const nome = request.body.nome;
    const email = request.body.email;
    //recuperar informaçao do objeto para atualizar ele - EXEMPLO: select * from usuarios u WHERE id = u.id
    const indiceUsuario = usuarios.findIndex(u => u.id === id);
    //se nao existe o usuario, findIndex retorna -1 
    if (indiceUsuario < 0){
        return response.status(404).json({mensagem:"usuario nao encontrado"});
    }
    //se existe, coloca as informaçoes no usuario do id expecifico
    usuarios[indiceUsuario] = {
        id: id,
        nome: nome,
        email: email,
    };
    //status - requisiçao foi bem sucedida
    response.status(200).json(usuarios[indiceUsuario]);
});

 //PATCH /usuarios/:id
 //método: PATCH
 //descrição:atualiza PARCIALMENTE um usuário - um campo
 //recebe: { nome:string }
 //parâmetro: id
app.patch("/usuarios/:id", (request,response) => {
    
    //novamente pegando as informações
    const id = parseInt(request.params.id);
    const nome = request.body.nome;

    //novamente encontrando o usuário
    const indiceUsuario = usuarios.findIndex(u => u.id === id);

    if( indiceUsuario < 0){
        return response.status(404).json({mensagem:"usuario nao encontrado"});
    }
    //alteraçao do nome no usuario expecifico
    usuarios[indiceUsuario].nome = nome;

    response.status(200).json(usuarios[indiceUsuario]);
});

 //DELETE /usuarios/:id
 //metodo: DELETE
 //descricao: remove um usuario por id
 //parametro: id
app.delete("/usuarios/:id", (request,response) => {
    const id = parseInt(request.params.id);

    const indiceUsuario = usuarios.findIndex( u => u.id === id);

    if( indiceUsuario < 0){
        return response.status(404).json({mensagem:"usuario nao encontrado"});
    }

    //remove objeto do id indicado, o 1 fala quantos "da frente" ele vai remover, se fosse 2 iria remover o id que indicamos + 1 id/usuario da frente
    usuarios.splice(indiceUsuario,1);

    response.status(200).json({mensagem:"usuario removido"});
});

app.listen(porta,(request,response) =>{
    console.log(`servidor rodando: http://127.0.0.1:${porta} ✔`);
});