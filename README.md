🍽️ Restaurante-sistema

Uma API backend para gerenciamento de pedidos em restaurante, construída com Node.js, Express e Knex.js, com foco em organização de ordens, validação de entrada e tratamento de erros robusto 💪.

🧠 Descrição

Este projeto implementa um sistema de pedidos para restaurantes, onde é possível:

✔ Criar ordens vinculadas a sessões de mesa
✔ Listar todas as ordens de uma mesa
✔ Calcular o total de todas as ordens de uma sessão
✔ Validar dados de entrada com Zod
✔ Tratar erros de forma customizada

👉 Esta API pode ser usada como base para um aplicativo frontend de gestão de restaurantes ou como backend para um sistema de PDV (Ponto de Venda).

🚀 Funcionalidades

✅ Criar pedido: registre novos pedidos vinculados a uma sessão de mesa

📋 Listar pedidos: consulte todas as ordens por sessão

💰 Calcular total: obtenha o total gasto em uma sessão de mesa

🔒 Validação de dados: entrada de dados validada com Zod

⚠️ Tratamento de erros: centralizado com mensagens claras para o cliente

🛠️ Tecnologias

Este projeto utiliza as seguintes tecnologias:

Node.js — ambiente de execução JavaScript

Express — framework web para API

Knex.js — query builder para SQL

Zod — validação de schemas

MySQL / PostgreSQL — bancos de dados compatíveis

TypeScript — tipagem estática no backend

📡 Rotas Disponíveis
Método	Rota	Descrição
POST	/orders	Criar um novo pedido
GET	/orders/:table_session_id	Listar pedidos por sessão da mesa
GET	/orders/:table_session_id/total	Total de pedidos por sessão
📦 Como rodar localmente

Clone o repositório:

git clone https://github.com/Isac2006/Restaurante-sistema.git


Entre no diretório:

cd Restaurante-sistema


Instale as dependências:

npm install


Configure o banco de dados (arquivo knexfile.js)

Rode as migrations:

npx knex migrate:latest


Inicie o servidor:

npm run dev


Teste as rotas usando Postman ou Insomnia 📩

📌 Sobre o projeto

Este sistema foi criado como API backend funcional para gerenciamento de pedidos em um restaurante, sendo uma ótima base para projetos de full-stack, aplicações móveis conectadas ou sistemas de PDV modernos.
