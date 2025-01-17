#!/bin/bash

# Voltar para a raiz do projeto
cd "$(dirname "$0")/.."

echo "🚀 Iniciando a configuração do projeto..."

# 📝 Copiar .env.example para .env no backend
echo "📄 Verificando .env no backend..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Arquivo .env do backend criado a partir de .env.example."
else
    echo "ℹ️  Arquivo .env do backend já existe, não foi sobrescrito."
fi
cd ..

# 📝 Copiar .env.example para .env no frontend
echo "📄 Verificando .env no frontend..."
cd frontend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Arquivo .env do frontend criado a partir de .env.example."
else
    echo "ℹ️  Arquivo .env do frontend já existe, não foi sobrescrito."
fi
cd ..

# Subir containers com Docker Compose
echo "🐳 Subindo containers com Docker Compose..."
docker-compose up -d --build

# Aguardar o banco de dados estar pronto
echo "⌛ Aguardando o banco de dados estar pronto..."

# Loop para verificar se o MariaDB está aceitando conexões
until docker exec gestor-de-clientes-database mariadb --user=user --password=userpassword --host=database --port=3306 -e "SELECT 1" > /dev/null 2>&1; do
    echo "⏳ Esperando o banco de dados estar pronto..."
    sleep 5
done

echo "✅ Banco de dados está pronto."

# Rodar migrations e seeders
echo "🔄 Rodando migrations e seeders..."
docker exec -t gestor-de-clientes-backend /bin/sh -c "npm run db:init"

echo ""
echo "🎉 Projeto configurado com sucesso!"
echo ""
echo "👉 Frontend via proxy reverso: http://localhost"
echo "👉 Frontend sem proxy reverso: http://localhost:5173"
echo ""
echo "👉 Backend via proxy reverso: http://localhost/api"
echo "👉 Backend sem proxy reverso: http://localhost:3000/api"
echo ""
echo "👉 Mailhog: http://localhost:8025"
echo ""
echo "👉 PHPMyAdmin: http://localhost:8081"
echo ""
