
const API_ALUNOS = "http://localhost:3000/alunos"


    const inputNome = document.getElementById("nome")
    const inputCpf = document.getElementById("cpf")
    const inputCep = document.getElementById("cep")
    const inputUf = document.getElementById("uf")
    const inputRua = document.getElementById("rua")
    const inputNumero = document.getElementById("numero")
    const inputComplemento = document.getElementById("complemento")
    const formAluno = document.getElementById("form-aluno")


    

async function salvar(e) {
        e.preventDefault();

        const nome = inputNome.value.trim();
        const cpf = inputCpf.value.trim();
        const cep = inputCep.value.trim();
        const uf = inputUf.value.trim();
        const rua = inputRua.value.trim();
        const numero = inputNumero.value.trim();
        const complemento = inputComplemento.value.trim();

        const novoAluno = {
         nome, cpf, cep, uf, rua, numero, complemento
        }
        try {
            const requisicao = await fetch(API_ALUNOS,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(novoAluno)
                });
            if (requisicao.status === 201) {
                window.location.href = "index.html";
            }
            else {
                alert("Erro ao cadastrar aluno");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

formAluno.addEventListener("submit", salvar)

formAluno.addEventListener("reset", limpar)