#!/bin/bash

# Habilitar saída de erro ao primeiro problema
set -e

# Emojis para o terminal
TRASH="🗑️"
STOP="🛑"
START="🚀"
SUCCESS="✅"
WARNING="⚠️"

# Exibir mensagem de início
echo "$START Iniciando o reset do ambiente local..."

# Remover arquivos temporários e node_modules
echo "$TRASH Removendo node_modules e arquivos temporários..."
sudo rm -rf backend/node_modules frontend/node_modules
sudo rm -rf backend/dist frontend/dist
sudo rm -f backend/npm-lock.json frontend/npm-lock.json
sudo rm -rf backend/tmp frontend/tmp
echo "$SUCCESS Limpeza de arquivos temporários concluída!"

# Parar containers
echo "$STOP Parando containers Docker..."
docker-compose down || echo "$WARNING Não foi possível parar alguns containers."

# Executando setup.sh
echo "$START Executando setup.sh..."
./scripts/setup.sh

# Mensagem final
echo "$SUCCESS Reset do ambiente local concluído com sucesso!"