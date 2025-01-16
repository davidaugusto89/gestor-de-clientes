# Projeto Fullstack com NestJS e VueJS | QEntregas 🚀


Este é um projeto fullstack que utiliza **NestJS** para o backend e **VueJS** com **Vite** para o frontend. O projeto está configurado com Docker para simplificar o desenvolvimento e a execução. Abaixo, você encontrará todas as informações necessárias para entender, instalar e executar o projeto.

## 🛠 Tecnologias Utilizadas

### Backend
- **NestJS** com **TypeORM**: Estrutura modular e escalável para desenvolvimento backend.
- **Swagger**: Documentação interativa para a API.
- **Jest**: Testes unitários (futuramente).
- **Testes E2E**: Planejados para desenvolvimento futuro.

### Frontend
- **VueJS** com **Vite**: Framework frontend moderno e rápido.

### Infraestrutura
- **Docker**:
- **MariaDB**: Banco de dados relacional.
- **PhpMyAdmin**: Gerenciamento visual do banco.
- **Nginx**: Proxy reverso para backend e frontend.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Docker** e **Docker Compose** instalados.
- Permissões para executar scripts (`chmod +x setup.sh` no Linux/Mac).

### Passos para Configuração
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Execute o script de setup:
   ```bash
   ./scripts/setup.sh
   ```

   Este script irá:
   - Instalar dependências do frontend e backend.
   - Inciar o Docker
   - Copiar os arquivos `.env.example` para `.env` em cada diretório.

3. Acesse:
   - **Frontend**: [http://localhost](http://localhost)
   - **Backend Swagger**: [http://localhost/api](http://localhost/api)
   - **PhpMyAdmin**: [http://localhost:8080](http://localhost:8081)

## 📝 Documentação da API

A API está documentada com **Swagger**. Após iniciar o backend, acesse:
[http://localhost/api](http://localhost/api)

### Importar no Insomnia
Você pode importar o arquivo disponível em `docs/insomnia.json` para o **Insomnia** e começar a testar a API.

## 🧪 Testes

### Testes Unitários
Os testes serão implementados com **Jest** no backend. Para executar:
cd backend
npm run test

### Testes E2E
Planejados para desenvolvimento futuro.

## 🤝 Contribuição

Sinta-se à vontade para abrir **issues** ou enviar **pull requests**. Toda contribuição é bem-vinda!

---

**Autor:**
[David Augusto](https://github.com/davidaugusto89/)

**Licença:**
Este projeto está licenciado sob a [MIT License](LICENSE).