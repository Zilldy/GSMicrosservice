# Use a imagem oficial do Node.js
FROM node:14

# Instalar as dependências para o Puppeteer (Chromium)
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install
RUN npm install amqplib
RUN npm install handlebars
RUN npm install mysql2

# Copiar o restante do código da aplicação
COPY . .

# Definir o comando para rodar a aplicação
CMD ["node", "index.js"]