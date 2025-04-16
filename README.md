# 💧 Hydrapp API

API backend do **Hydrapp**, um aplicativo para monitoramento de ingestão de água. Desenvolvido com **Node.js + Express + Prisma + MySQL**, com autenticação JWT e documentação Swagger.

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/ThyMont/xpe_projeto_aplicado_backend.git
cd xpe_projeto_aplicado_backend
```

### 2. Instale as dependências

```bash
npm install
```

## 🐬 Banco de Dados com Docker

```bash
docker run --name hydrapp-mysql \
  -e MYSQL_ROOT_PASSWORD=senha123 \
  -e MYSQL_DATABASE=hydrapp_db \
  -p 3306:3306 \
  -d mysql:8
```

## ⚙️ Configuração do `.env`

```env
DATABASE_URL="mysql://root:senha123@localhost:3306/hydrapp_db"
JWT_SECRET=sua_chave_secreta
JWT_REFRESH_SECRET=segredoDeEstadoRefresh
PORT=3000
```

## 📦 Migrations com Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🧪 Rodando a API

```bash
npm run dev
```

Servidor rodará em: http://localhost:3000

## 📚 Documentação Swagger

http://localhost:3000/api/docs

## ✅ Tecnologias

- Node.js + Express
- Prisma ORM
- MySQL (via Docker)
- JWT Auth
- Swagger

## 📄 Licença

MIT
