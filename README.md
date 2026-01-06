# Restaurante-sistema
Backend restaurant order system with Node.js, Express, and Knex.js. Create orders, list orders per table, and calculate session totals. Input validation with Zod and custom error handling.
# Restaurant Order System

## Descrição
Sistema backend de pedidos de restaurante com **Node.js, Express e Knex.js**. Cria pedidos, lista ordens por mesa e calcula total por sessão. Validação com **Zod** e tratamento de erros customizado.

## Funcionalidades
- Criar pedidos vinculados a sessões de mesas  
- Listar todas as ordens de uma mesa  
- Calcular total de pedidos por sessão  
- Validação de dados com **Zod**  
- Tratamento de erros customizado com **AppError**  

## Tecnologias
- Node.js  
- Express  
- Knex.js  
- MySQL/PostgreSQL  
- Zod  

## Rotas
| Método | Rota | Descrição |
|--------|------|-----------|
| POST   | `/orders` | Criar uma nova ordem |
| GET    | `/orders/:table_session_id` | Listar ordens de uma sessão |
| GET    | `/orders/:table_session_id/total` | Total de todas as ordens da sessão |

## Como usar
1. Clone o repositório:  
```bash
git clone <url-do-repositorio>
Instale as dependências:

2
npm install
Configure seu banco de dados em knexfile.js
3
Rode as migrations:



npx knex migrate:latest
4
Inicie o servidor:



npm run dev
Teste as rotas no Postman ou Insomnia