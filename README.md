# Getor de Clientes com NestJS e VueJS 🚀


Este é um Gestor de Clientes que utiliza **NestJS** para o backend e **VueJS** com **Vite** para o frontend. O projeto está configurado com Docker para simplificar o desenvolvimento e a execução. Abaixo, você encontrará todas as informações necessárias para entender, instalar e executar o projeto.

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
- **Mailhog**: SMTP local
- **Nginx**: Proxy reverso para backend e frontend.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Docker** e **Docker Compose** instalados.
- Permissões para executar scripts (`chmod +x scripts/setup.sh` no Linux/Mac).

### Passos para Configuração
1. Clone o repositório:
   ```bash
   git clone https://github.com/davidaugusto89/gestor-de-clientes.git
   cd gestor-de-clientes
   ```

2. Execute o script de setup:
   ```bash
   ./scripts/setup.sh
   ```

   Este script realiza as seguintes etapas:

   - Sobe os containers definidos no `docker-compose.yml` usando Docker Compose.
   - Aguarda até que o banco de dados MariaDB esteja pronto para conexões.
   - Executa as migrations e seeders automaticamente no backend.
   - Exibe os links para acesso ao frontend, backend e PhpMyAdmin.

3. Acesse:
   - **Frontend via proxy reverso:** [http://localhost](http://localhost)
   - **Frontend sem proxy reverso:** [http://localhost:5173](http://localhost:5173)
   - **Backend via proxy reverso:** [http://localhost/api](http://localhost/api)
   - **Backend sem proxy reverso:** [http://localhost:3000/api](http://localhost:3000/api)
   - **Mailhog**: [http://localhost:8025](http://localhost:8025)
   - **PhpMyAdmin:** [http://localhost:8081](http://localhost:8081)

## 📝 Documentação da API

A API está documentada com **Swagger**. Após iniciar o backend, acesse:
[http://localhost/api/docs](http://localhost/api/docs)


## 🧪 Testes

### Testes Unitários
Os testes serão implementados com **Jest** no backend. Para executar:
cd backend
npm run test

---

**Autor:**
[David Augusto](https://github.com/davidaugusto89/)

**Licença:**
Este projeto está licenciado sob a [MIT License](LICENSE).