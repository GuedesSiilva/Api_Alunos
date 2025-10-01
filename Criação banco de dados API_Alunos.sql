escola_db



CREATE DATABASE escola_db;

CREATE TABLE alunos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(80) NOT NULL,
	cpf CHAR(11),
	cep CHAR(8),
  	uf CHAR(2),
  	rua VARCHAR(120),
  	numero INT,
  	complemento VARCHAR(120),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

SELECT * FROM alunos;

INSERT INTO alunos 
	(nome,cpf,cep, uf, rua , numero, complemento)
VALUES 
	("Vitor Lima", "12345678910","06000000","SP","Rua Senai",123, "APTO 12"),
	("Wendel ", "98765432100","06000001","SP","Avenida Central",123, NULL),
	("Matheus", "45678912399","06000002","SP","Rua Nova",123, "Casa 1");
	
