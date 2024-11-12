# Use the official Node.js image
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar o Chromium necessário para o Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN npm install
RUN npm install amqplib
RUN npm install handlebars
RUN npm install mysql2
RUN npm install puppeteer
RUN npm install uuid

# Definir a variável de ambiente do Puppeteer para usar o Chromium instalado
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copia o restante do código da aplicação
COPY . .

# Define o comando para rodar a aplicação
CMD ["node", "index.js"]