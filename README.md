# Gestor de Clientes com NestJS e VueJS 🚀


Este é um Gestor de Clientes que utiliza **NestJS** para o backend e **VueJS** com **Vite** para o frontend. O projeto está configurado com Docker para simplificar o desenvolvimento e a execução. Abaixo, você encontrará todas as informações necessárias para entender, instalar e executar o projeto.

---

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

---

## 🧭 Funcionalidades Principais

- **Autenticação Segura**: Suporte a login, recuperação e redefinição de senha.
- **Gestão de Clientes Completa**: Criação, edição, listagem e exclusão de registros.
- **Painel Centralizado**: Dashboard intuitivo para monitorar métricas do sistema.
- **Envio de Notificações**: Integração com SMTP local para e-mails automatizados.

---

## 🧩 Decisões de Arquitetura

**Backend Modular**: Estruturado em módulos independentes como Clientes, Usuários e Auth, para maior organização e manutenibilidade.
**Padrão Service**: Facilitando a criação de testes e o reaproveitamento de lógica.
**Frontend Escalável**: Separação clara entre estado, componentes e rotas, promovendo extensibilidade.
**Infraestrutura Simplificada**: Configuração via Docker para garantir consistência no ambiente de desenvolvimento.

---

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

---

## 📝 Documentação da API

A API está documentada com **Swagger**. Após iniciar o backend, acesse:
[http://localhost/api/docs](http://localhost/api/docs)

---

## 🗂️ Estrutura de Pastas

Abaixo está a estrutura do projeto com explicação das principais pastas:
```bash
├── backend
│   ├── src
│   │   ├── auth
│   │   │   └── dto
│   │   ├── clientes
│   │   │   ├── dto
│   │   │   ├── entities
│   │   │   └── mocks
│   │   ├── database
│   │   │   ├── config
│   │   │   ├── migrations
│   │   │   └── seeders
│   │   ├── decorators
│   │   ├── enums
│   │   ├── guards
│   │   ├── interfaces
│   │   ├── mailer
│   │   │   └── interfaces
│   │   ├── strategies
│   │   ├── templates
│   │   ├── usuarios
│   │   │   ├── dto
│   │   │   ├── entities
│   │   │   └── mocks
│   │   └── validators
├── frontend
│   ├── public
│   └── src
│       ├── assets
│       ├── components
│       │   └── global
│       ├── composables
│       ├── helpers
│       │   └── validations
│       ├── layouts
│       ├── router
│       ├── services
│       ├── stores
│       ├── utils
│       └── views
│           ├── Clientes
│           ├── Dashboard
│           ├── Login
│           └── Usuarios
├── nginx
└── scripts
```

#### **Backend**
- **src**: Diretório principal do código backend.
  - **auth**: Lógica relacionada à autenticação de usuários.
    - **dto**: Objetos de transferência de dados usados na autenticação.
  - **clientes**: Funcionalidades relacionadas a clientes.
    - **dto**: Objetos de transferência de dados para clientes.
    - **entities**: Classes que representam a estrutura de dados do cliente.
    - **mocks**: Dados simulados para testes ou desenvolvimento local.
  - **database**: Configuração e gerenciamento do banco de dados.
    - **config**: Configurações gerais do banco de dados.
    - **migrations**: Scripts de migração do banco de dados.
    - **seeders**: Scripts para popular o banco com dados iniciais.
  - **decorators**: Decorators personalizados para funções ou classes.
  - **enums**: Enumerações utilizadas no backend.
  - **guards**: Classes que implementam lógica de proteção de rotas.
  - **interfaces**: Interfaces TypeScript para padronizar objetos.
  - **mailer**: Configurações e lógica para envio de e-mails.
    - **interfaces**: Interfaces para os serviços de e-mail.
  - **strategies**: Estratégias para autenticação ou outras funcionalidades.
  - **templates**: Templates utilizados para envio de e-mails ou relatórios.
  - **usuarios**: Funcionalidades relacionadas aos usuários do sistema.
    - **dto**: Objetos de transferência de dados para usuários.
    - **entities**: Classes que representam a estrutura de dados do usuário.
    - **mocks**: Dados simulados para desenvolvimento ou testes.
  - **validators**: Lógica de validação de dados.

#### **Frontend**
- **public**: Arquivos estáticos acessíveis publicamente (imagens, ícones, etc.).
- **src**: Diretório principal do código frontend.
  - **assets**: Recursos estáticos, como imagens, fontes e arquivos CSS.
  - **components**: Componentes reutilizáveis da interface.
    - **global**: Componentes globais utilizados em todo o projeto.
  - **composables**: Funções reutilizáveis utilizando Composition API do Vue 3.
  - **helpers**: Funções auxiliares.
    - **validations**: Validações reutilizáveis no frontend.
  - **layouts**: Layouts utilizados nas páginas do projeto.
  - **router**: Configurações das rotas do Vue Router.
  - **services**: Comunicação com APIs ou serviços externos.
  - **stores**: Gerenciamento de estado usando Pinia ou Vuex.
  - **utils**: Funções utilitárias reutilizáveis.
  - **views**: Páginas principais da aplicação.
    - **Clientes**: Páginas relacionadas à gestão de clientes.
    - **Dashboard**: Painel principal do sistema.
    - **Login**: Página de autenticação.
    - **Usuarios**: Páginas relacionadas à gestão de usuários.

#### **nginx**
Configurações do servidor NGINX, como regras de proxy ou redirecionamento.

#### **scripts**
Scripts auxiliares para automação ou setup do projeto (ex.: configuração inicial).

---

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