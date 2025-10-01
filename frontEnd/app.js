console.log("app.js funcionando");

const API = "http://localhost:3000/alunos"

async function carregarTabela() {

    try{
        const resposta = await fetch(API);
        const alunos = await resposta.json();
        const tbody = document.getElementById("tbody")

        tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"

        // setTimeout(() => {
            tbody.innerHTML = "";
            tbody.innerHTML = alunos.map(a =>
                `<tr>
                    <td>${a.id}</td>
                    <td>${a.nome}</td>
                    <td>${a.cpf}</td>
                    <td>${a.cep}</td>
                    <td>${a.uf}</td>
                    <td>${a.rua} senai</td>
                    <td>${a.numero}</td>
                    <td>${a.complemento}</td>
                    <td>
                    <a href="editar.html?id=${a.id}"><button>Editar</button></a>
                    <button onclick="excluir(${a.id})">Excluir</button> 
                    </td>
                </tr>`
            ).join("");
        // }, 2000) // 5 segundos
}catch (error) {
    console.error(error.message);
}
}
window.carregarTabela = carregarTabela;
carregarTabela();


async function excluir(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) {
        return;
    }
    console.log("Excluindo aluno", id);
    try{
        const resposta = await fetch(`${API}/${id}`, {method: "DELETE"});
        if (resposta.status === 200) {
            console.log("Aluno excluído com sucesso");
            carregarTabela();
        }else{
            console.log("Erro ao excluir aluno");
        }
    }catch (error) {
        console.error(error.message);
    }
}
window.excluir = excluir;


