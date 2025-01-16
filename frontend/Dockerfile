# Use a imagem oficial Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de configuração de dependências
COPY package.json ./

# Instale as dependências do projeto com npm
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta 5173 (usada pelo Vite)
EXPOSE 5173

# Comando padrão para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]