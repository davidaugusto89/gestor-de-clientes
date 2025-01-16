# Base na versão mais recente do Node.js
FROM node:latest

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos essenciais de dependências
COPY package.json ./

# Instalar dependências com npm
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Expor a porta do aplicativo
EXPOSE 3000

# Comando para iniciar o aplicativo em modo desenvolvimento
CMD ["npm", "run", "start:dev"]