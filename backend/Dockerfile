# Base na versão mais recente do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json package-lock.json* ./

# Instale todas as dependências, incluindo devDependencies
RUN npm install

# Copie o restante dos arquivos para o container
COPY . .

# Exponha a porta usada pelo Vite
EXPOSE 5173

# Comando padrão para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]