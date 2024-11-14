# GSMicrosservice
GS de microsserviços
INTEGRANTES
Gabriel Arbigaus Carvalho De Souza - RM 93372
Guilherme Cardoso Barreiro - RM 94726
Para rodar o projeto inicie o docker desktop
Rode no terminal o comandando "docker compose up"
Envie o seguinte cURL no Postman
POST /certificado HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Content-Length: 374
{
    "nm_aluno": "Jose Romualdo",
    "nacionalidade": "BR",
    "estado": "SP",
    "dt_nascimento": "1992-11-04",
    "rg": "525366140",
    "dt_conclusao": "2024-01-01",
    "curso": "Java Spring Boot",
    "carga_horaria": 320,
    "dt_emissao": "2024-01-30",
    "nm_docente": "Carlos Adão",
    "cargo_docente": "Professor",
    "arq_certificado": ""
}
E para visulizar o certificado rode o seguinte cURL
GET /certificado/id/1 HTTP/1.1
Host: localhost:8080
