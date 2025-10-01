
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
const porta = 3000;

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "root",
    database: "escola_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit : 0
})

app.get("/alunos", async (req, res) => {
    try{
        const [retorno] = await conexao.query("SELECT * FROM alunos")
        res.status(200).json(retorno);
    }catch(err){
        console.log(err);
        res.status(500).json({erro: "Erro ao buscar alunos"})
    }
})

app.post("/alunos", async (req,res) =>{
    try {
        const {nome, cpf, cep= null, 
            uf = null, rua = null, 
            numero = null, complemento= null
        } = req.body;

        if(!nome || !cpf) return res.status(400).json({msg : "Nome e cpf são obrigatorio"})
        const sql = `
            INSERT INTO alunos (nome,cpf,cep, uf, rua , numero, complemento)
            VALUES  (?, ?, ?, ?, ?, ?, ?)`;

        const parametro = [nome, cpf, cep, uf, rua, numero, complemento]

        const [resultado] = await conexao.execute(sql,parametro)
        console.log(resultado)

        const [novo] = await conexao.execute(`SELECT * FROM alunos WHERE id =  ${resultado.insertId}`)
        res.status(201).json(novo[0]);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({erro : "Erro ao inserir alunos"});
    }
})

app.get("/alunos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [retorno] = await conexao.query("SELECT * FROM alunos WHERE id=?", [id]);
        if (retorno.length === 0) {
            return res.status(404).json({ erro: "Aluno não encontrado" });
        }
        res.status(200).json(retorno[0]);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar aluno" });
    }
});

app.put("/alunos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, cpf, cep, uf, rua, numero, complemento } = req.body;
        await conexao.query(
            "UPDATE alunos SET nome=?, cpf=?, cep=?, uf=?, rua=?, numero=?, complemento=? WHERE id=?",
            [nome, cpf, cep, uf, rua, numero, complemento, id]
        );
        res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
});

app.delete("/alunos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await conexao.query("DELETE FROM alunos WHERE id=?", [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Aluno não encontrado" });
        }
        res.status(200).json({ mensagem: "Aluno excluído com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao excluir aluno" });
    }
});

app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));