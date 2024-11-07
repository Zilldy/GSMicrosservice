const amqp = require('amqplib/callback_api');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');
const mysql = require('mysql2');

const queue = 'certificados';
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

setTimeout(() => {
    console.log(`Aguardando o rabbitmq iniciar`);
}, 10000);

amqp.connect('amqp://rabbitmq', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, async function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            const dados = JSON.parse(msg.content.toString());
            try {
                console.log(dados);
                
                // Gera o conteúdo do certificado
                const templateContent = await generateCertificate(dados);

                // Atualiza o banco de dados
                await updateDatabase(dados.rg, templateContent);

                console.log(`Certificado atualizado com sucesso no banco de dados para o aluno ${dados.nm_aluno}`);
                console.log(`Visualize o certificado em: http://localhost:8080/certificado/rg/${dados.rg}`);
                

                // Confirma a mensagem após o processamento
                channel.ack(msg);
            } catch (error) {
                console.error("Erro ao gerar ou salvar o certificado:", error);
            }
        }, {
            noAck: false
        });
    });
});

function generateCertificate(data) {
    return new Promise((resolve) => {
        fs.readFile(path.join(__dirname, "template.html"), "utf8", function (err, html) {
            if (err) return console.error("Erro ao ler o template:", err);
            const template = Handlebars.compile(html);
            const result = template({
                nome: data.nm_aluno,
                nacionalidade: data.nacionalidade,
                estado: data.estado,
                data_nascimento: data.dt_nascimento,
                documento: data.rg,
                data_conclusao: data.dt_conclusao,
                curso: data.curso,
                carga_horaria: data.carga_horaria,
                data_emissao: data.dt_emissao,
                nome_assinatura: data.nm_docente,
                cargo: data.cargo_docente
            });
            resolve(result);
        });
    });
}

async function updateDatabase(rg, arq_certificado) {

    return new Promise((resolve, reject) => {
        const query = 'UPDATE certificados SET arq_certificado = ? WHERE rg = ?';
        connection.query(query, [arq_certificado, rg], (err, results) => {
            if (err) {
                console.error("Erro ao atualizar o banco de dados:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}