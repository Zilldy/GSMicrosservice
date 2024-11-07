const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Definindo os dados para preencher o HTML
const guid = require('uuid').v4();
const nome = "Gui";
const nacionalidade = "brasileiro";
const estado = "SP";
const data_nascimento = "25/05/2000";
const documento = "152.486.148-50";
const data_conclusao = "28/10/2024";
const curso = "JAVA";
const carga_horaria = "50";
const data_emissao = "28/10/2024";
const nome_assinatura = "Marcos Selmini";
const cargo = "Mestre";

// HTML como string com placeholders
const htmlString = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diploma</title>
    <style>
        @media print {
            @page {
                size: A4 landscape;
                margin: 0;
            }
            body {
                margin: 0;
                padding: 0;
            }
            body::before, body::after {
                display: none;
            }
        }
        body {
            font-family: 'Times New Roman', Times, serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .diploma-container {
            width: 90%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px;
            background-color: white;
            box-shadow: none;
        }
        .header {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
        }
        .sub-header {
            text-align: center;
            font-size: 20px;
            margin: 10px 0;
        }
        .content {
            margin: 40px 0;
            font-size: 18px;
            line-height: 1.5;
        }
        .signatures {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .signature {
            text-align: center;
        }
        .signature p {
            margin: 5px 0;
        }
        .date {
            text-align: center;
            margin-top: 40px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="diploma-container">
        <div class="header">Universidade de Programação</div>
        <div class="sub-header">Certificado de Conclusão</div>
        <div class="content">
            <p>
                Certificamos que <strong>${nome}</strong>, ${nacionalidade}, natural do Estado de ${estado}, nascido em ${data_nascimento}, RG ${documento}, concluiu em ${data_conclusao} o curso de ${curso}, nível de especialização, com carga horária de ${carga_horaria} horas.
            </p>
            <p>
                Este certificado é concedido em conformidade com o artigo 44, inciso 3353, da Lei 9394/96, e com a Resolução 
                C.N.C./C.C.S. nº 01/07.
            </p>
        </div>
        <div class="date">São Paulo, ${data_emissao}</div>
        <div class="signatures">
            <div class="signature">
                <p><strong>${nome_assinatura}</strong></p>
                <p>${cargo}</p>
            </div>            
        </div>
    </div>
</body>
</html>
`;

(async () => {
    // Inicia o Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Define o conteúdo da página
    await page.setContent(htmlString);

    // Definindo o caminho para salvar o PDF
    const pdfPath = path.resolve(__dirname, `${guid}.pdf`);

    // Gera o PDF
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        landscape: true,
        printBackground: true,
    });

    // Fecha o navegador
    await browser.close();

    console.log(`PDF gerado em: ${pdfPath}`);
})();