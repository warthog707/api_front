bconst API = "http://127.0.0.1:8000/usuarios";

let btnCriar = document.getElementById("botao-criar");

btnCriar.addEventListener("click", async function (){
    try {
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;

        if(!nome || !email){
            alert("preencha todos os campos");
            return;
        }

        document.getElementById("nome").value = "";
        document.getElementById("nome").value = "";
        
        alert("cadastrado");

        await fetch( API, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({nome,email}),
        });
    } catch (error) {
        console.log("error: "+ error);
    }
});

async function listarUsuarios() {
    const resp = await fetch(API);
    const usuarios = await resp.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    usuarios.foreach(usuario =>{
        const li = document.createElement("li");
        li.innerHTML = `
            ${usuario.nome} - ${usuario.email}
            <button onclick="editar(${usuario.id},${usuario.nome},${usuario.email},)">Editar</button>
            <button onclick="patchUsuario(${usuario.id})">alterar nome</button>
            <button onclick="deletarUsuario(${usuario.id})">deletar</button>
        `
    });
}