# Base na versão mais recente do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json package-lock.json* ./

# Antes de instalar as dependências, remova caches antigos (opcional)
RUN npm cache clean --force

# Instale todas as dependências, incluindo devDependencies
RUN npm install

# Copie o restante dos arquivos para o container
COPY . .

# Construa a aplicação
RUN npm run build

# Crie a pasta templates em dist
RUN mkdir -p dist/templates

# Copia os templates para o diretório dist/templates
COPY src/templates ./dist/templates

# Exponha a porta usada pelo Vite
EXPOSE 5173

# Comando padrão para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "start:dev"]