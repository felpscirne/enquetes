# 📚 Trabalho III: API de Enquetes (Polls API)

API RESTful desenvolvida em Node.js e TypeScript, seguindo a arquitetura **Clean Architecture** e princípios de **Domain-Driven Design (DDD)**.

## 🔗 Stack Tecnológica

* **Linguagem:** TypeScript
* **Runtime:** Node.js
* **Framework Web:** Express
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL (ou outro SQL compatível)
* **Autenticação:** JSON Web Tokens (JWT)
* **Validação:** Zod
* **Hash de Senha:** bcrypt

## 📐 Arquitetura do Projeto

O projeto é estruturado em camadas claras, seguindo o padrão Clean Architecture:

1.  **Domain:** Entidades, Value Objects e Interfaces de Repositório (regras de negócio puras).
2.  **Application:** Casos de Uso (`Use Cases`) que orquestram a lógica da aplicação.
3.  **Infrastructure (Infra):** Implementação de banco de dados (Prisma) e serviços externos.
4.  **Interface (Interface/HTTP):** Controladores (`Controllers`) e Rotas (Express).
5.  **Main:** Factories (`make-*.ts`) para injeção de dependências. 

## 🛠 Como Rodar o Projeto

### Pré-requisitos

* Node.js (versão 18+)
* Docker (para rodar o PostgreSQL de forma simples) ou um banco de dados PostgreSQL instalado.

### 1. Configuração do Ambiente

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/felpscirne/enquetes.git]
    cd enquetes
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie o arquivo de variáveis de ambiente `.env` na raiz do projeto, baseado no `.env.example`.

    ```env
    # Exemplo de .env
    DATABASE_URL="postgresql://docker:docker@localhost:5432/pollsdb?schema=public"
    JWT_SECRET="SEU_SEGREDO_FORTE_AQUI"
    API_BASE_URL="http://localhost:3333" # Usado na geração do QR Code
    ```

### 2. Banco de Dados e Migrations

1.  Inicie o banco de dados (via Docker, por exemplo).
2.  Rode as migrations para criar o schema com as tabelas `users`, `polls`, `poll_options` e `votes`:
    ```bash
    npx prisma migrate dev --name init_database
    ```

### 3. Execução

Rode a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

A API estará acessível em http://localhost:3333.

### 4.🔑 Autenticação (JWT)
Todos os endpoints de Enquetes e Votos são protegidos e exigem o token no cabeçalho Authorization: Bearer <token>.


POST  /auth/register     Cria um novo usuário.
POST  /auth/login        Gera o accessToken JWT.

### 💡 Endpoints Implementados (Enquetes e Votos)

#### Enquetes (CRUD e Listagem)

| Método | Endpoint | Requisito | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/polls` | 2.2.1 | Cria uma nova enquete. **(Autenticado)** |
| `GET` | `/polls` | 2.5 | Lista enquetes com filtros e paginação. |
| `GET` | `/polls/:pollId` | 2.2.3 | Detalhes da enquete e informa se o usuário logado já votou. |
| `POST` | `/polls/:pollId/close` | 2.2.2 | Encerra a enquete manualmente. **(Apenas criador)** |
| `PATCH` | `/polls/:pollId/extend` | 2.2.2 | Estende `endAt` ou `expectedVotes`. **(Apenas criador)** |

#### Votos e Resultados

| Método | Endpoint | Requisito | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/polls/:pollId/votes` | 2.3.1 | Registra um voto na opção. **(Implementa trava de voto único e fechamento automático por limite)** |
| `GET` | `/polls/:pollId/results` | 2.3.2 | Exibe o resultado parcial (votos e %) respeitando a visibilidade (`PUBLIC`/`PRIVATE`). |


#### Histórico do Usuário (Requisito 2.4)

| Método | Endpoint | Requisito | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/me/polls/created` | 2.4 | Retorna todas as enquetes criadas pelo usuário logado. |
| `GET` | `/me/polls/voted` | 2.4 | Retorna o histórico de votos do usuário (incluindo qual opção escolheu). |


### 5. ✨ Desafio Extra Implementado

**Desafio Extra C – Acesso por QR Code**

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/polls/:pollId/qrcode` | Gera e retorna a imagem PNG do QR Code. |

Como Testar:

Chame este endpoint com o ID de uma enquete existente.
O Postman ira responder com a URL do QR Code em formato PNG.
Acessando o link, a imagem sera exibida.
Ao escanear o código, ele redirecionará para a URL pública da enquete: [API_BASE_URL]/polls/:pollId.

### 6. 🔎 Filtros de Enquetes (GET /polls)

O endpoint de listagem suporta os seguintes filtros via Query Params:

Parâmetro    Tipo     Exemplo de Uso
page         number   ?page=2
limit        number   ?limit=20
status       string   ?status=OPEN
category     string   ?category=tech

Exemplo
```
GET /polls?page=1&limit=10&status=OPEN&category=programming
```