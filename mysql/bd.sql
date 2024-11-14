CREATE DATABASE IF NOT EXISTS sistema_certificados;
USE sistema_certificados;

CREATE TABLE IF NOT EXISTS certificados (
    certificado_id INT AUTO_INCREMENT PRIMARY KEY,
    nm_aluno VARCHAR(255),
    nacionalidade VARCHAR(255),
    estado VARCHAR(2),
    dt_nascimento DATE,
    rg VARCHAR(9),
    dt_conclusao DATE,
    curso VARCHAR(255),
    carga_horaria VARCHAR(255),
    dt_emissao DATE,
    nm_docente VARCHAR(255),
    cargo_docente VARCHAR(255),
    arq_certificado VARCHAR(255)
);
