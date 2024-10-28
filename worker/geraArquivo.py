from bs4 import BeautifulSoup
import pdfkit
import uuid
import os

guid = uuid.uuid4()

nome = "Gui"
nacionalidade = "brasileiro"
estado = "SP"
data_nascimento = "25/05/2000"
documento = "152.486.148-50"
data_conclusao = "28/10/2024"
curso = "JAVA"
carga_horaria = "50"
data_emissao = "28/10/2024"
nome_assinatura = "Marcos Selmini"
cargo = "Mestre"

# HTML como string
html_string = f"""
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diploma</title>
    <style>
        @media print {{
            @page {{
                size: A4 landscape;
                margin: 0; /* Remove margem padrão */
            }}
            body {{
                margin: 0;
                padding: 0;
            }}
            /* Ocultar cabeçalho e rodapé padrão */
            body::before, body::after {{
                display: none;
            }}
        }}

        body {{
            font-family: 'Times New Roman', Times, serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }}
        
        .diploma-container {{
            width: 90%; /* Ajuste de largura para caber na página A4 em modo paisagem */
            max-width: 1000px; /* Garantir que não ultrapasse a largura máxima */
            margin: 0 auto;
            padding: 40px;
            background-color: white;
            box-shadow: none;
        }}

        .header {{
            text-align: center;
            font-size: 28px;
            font-weight: bold;
        }}

        .sub-header {{
            text-align: center;
            font-size: 20px;
            margin: 10px 0;
        }}

        .content {{
            margin: 40px 0;
            font-size: 18px;
            line-height: 1.5;
        }}

        .signatures {{
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }}

        .signature {{
            text-align: center;
        }}

        .signature p {{
            margin: 5px 0;
        }}

        .date {{
            text-align: center;
            margin-top: 40px;
            font-size: 18px;
        }}
    </style>
</head>
<body>
    <div class="diploma-container">
        <div class="header">Universidade de Programação</div>
        <div class="sub-header">Certificado de Conclusão</div>
        <div class="content">
            <p>
                Certificamos que <strong>{nome}</strong>, {nacionalidade}, natural do Estado de {estado}, nascido em {data_nascimento}, RG {documento}, concluiu em {data_conclusao} o curso de {curso}, nível de especialização, com carga horária de {carga_horaria} horas.
            </p>
            <p>
                Este certificado é concedido em conformidade com o artigo 44, inciso 3353, da Lei 9394/96, e com a Resolução 
                C.N.C./C.C.S. nº 01/07.
            </p>
        </div>
        <div class="date">São Paulo, {data_emissao}</div>
        <div class="signatures">
            <div class="signature">
                <p><strong>{nome_assinatura}</strong></p>
                <p>{cargo}</p>
            </div>            
        </div>
    </div>
</body>
</html>
"""

# Obtenha o diretório do projeto
base_dir = os.path.dirname(os.path.abspath(__file__))

# Caminho para salvar o PDF gerado
pdf_file = os.path.join(base_dir, f'{guid}.pdf')

# Defina o caminho para o executável do wkhtmltopdf
wkhtmltopdf_path = os.path.join(base_dir, 'wkhtmltopdf.exe')
config = pdfkit.configuration(wkhtmltopdf=wkhtmltopdf_path)

# Converte o HTML em PDF
pdfkit.from_string(html_string, pdf_file, configuration=config)
