const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Importa a função uuid

async function htmlToPdf(htmlContent) {
    // Inicia o Puppeteer em modo headless com parâmetros extras para Docker
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-zygote',
            '--single-process', // Pode ajudar a reduzir o uso de memória no Docker
            '--disable-gpu'
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium' // Usa o Chromium instalado
    });
    
    const page = await browser.newPage();
    
    // Define o conteúdo da página
    await page.setContent(htmlContent);
    
    // Gera um UUID e define o caminho para salvar o PDF
    const pdfPath = path.resolve("/arquivos", `${uuidv4()}.pdf`);
    
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

    console.log(typeof(pdfPath));

    return `${pdfPath}`
}

module.exports = htmlToPdf;
