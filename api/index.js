const express = require('express');
const amqp = require('amqplib');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Conexão com o MySQL
const connection = mysql.createConnection({
    host: 'mysql',
    user: 'user',
    password: 'userpassword',
    database: 'sistema_certificados'
});

setTimeout(()=>{
    connection.connect((err) => {
        if (err) throw err;
        console.log('Conectado ao MySQL!');
    });
},5000);

// Conexão RabbitMQ
async function sendToQueue(message) {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        
        const queue = 'certificados';

        await channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            persistent: true
        });

        console.log("Mensagem enviada para fila:", message);
    } catch (error) {
        console.error("Erro ao enviar mensagem para fila:", error);
    }
}

// Endpoint para receber JSON e salvar no MySQL
app.post('/certificado', async (req, res) => {
    const {
        nm_aluno,
        nacionalidade,
        estado,
        dt_nascimento,
        rg,
        dt_conclusao,
        curso,
        carga_horaria,
        dt_emissao,
        nm_docente,
        cargo_docente,
        arq_certificado
    } = req.body;

    // Salvando os dados no MySQL
    const query = `INSERT INTO certificados (nm_aluno, nacionalidade, estado, dt_nascimento, rg, dt_conclusao, curso, carga_horaria, dt_emissao, nm_docente, cargo_docente, arq_certificado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [
        nm_aluno,
        nacionalidade,
        estado,
        dt_nascimento,
        rg,
        dt_conclusao,
        curso,
        carga_horaria,
        dt_emissao,
        nm_docente,
        cargo_docente,
        arq_certificado
    ], (err, result) => {
        if (err) {
            console.error("Erro ao salvar no MySQL:", err);
            return res.status(500).send('Erro ao salvar no banco de dados.');
        }

        // Enviar os dados para a fila RabbitMQ
        sendToQueue(req.body);

        res.status(201).json({
            message: 'Dados recebidos e processados com sucesso.',
            certificado_id: result.insertId
        });
    });
});

// Rota para obter o certificado em HTML pelo RG
app.get('/certificado/id/:id', async (req, res) => {
    const id = req.params.id;
    connection.query('SELECT arq_certificado FROM certificados WHERE certificado_id = ?', [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar certificado:", err);
            return res.status(500).send('Erro ao buscar certificado');
        }

        if (results.length > 0) {
            res.send(results[0].arq_certificado);
        } else {
            res.status(404).send('Certificado não encontrado');
        }
    });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});