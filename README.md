# 💧 Hydrapp API

API backend do **Hydrapp**, um aplicativo para monitoramento de ingestão de água. Desenvolvido com **Node.js + Express + Prisma + MySQL**, com autenticação JWT e documentação Swagger.

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/SeuUsuario/hydrapp-api.git
cd hydrapp-api
```

### 2. Instale as dependências

```bash
npm install
```

---

## 🐬 Banco de Dados com Docker

Você pode iniciar um banco MySQL local rapidamente com o comando abaixo:

```bash
docker run --name hydrapp-mysql \
  -e MYSQL_ROOT_PASSWORD=senha123 \
  -e MYSQL_DATABASE=hydrapp_db \
  -p 3306:3306 \
  -d mysql:8
```

> Obs: se o container já existir e estiver parado, use `docker start hydrapp-mysql`.

---

## ⚙️ Configuração do `.env`

Crie um arquivo `.env` com o seguinte conteúdo:

```env
DATABASE_URL="mysql://root:senha123@localhost:3306/hydrapp_db"
JWT_SECRET=sua_chave_secreta
PORT=3000
```

---

## 📦 Migrations com Prisma

### Gerar e aplicar a primeira migration:

```bash
npx prisma migrate dev --name init
```

> Isso cria as tabelas no banco e gera o cliente Prisma.

### Gerar o cliente Prisma (caso atualize o schema):

```bash
npx prisma generate
```

---

## 🧪 Rodando a API

```bash
npm run dev
```

Servidor rodará em: [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentação Swagger

Acesse:

[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 📌 Endpoints principais

| Método | Rota               | Protegida | Descrição                     |
|--------|--------------------|-----------|-------------------------------|
| POST   | /api/auth/register | ❌        | Registrar novo usuário        |
| POST   | /api/auth/login    | ❌        | Login e obter token JWT       |
| GET    | /api/auth/me       | ✅        | Obter dados do usuário logado |

---

## ✅ Tecnologias

- Node.js + Express
- Prisma ORM
- MySQL (via Docker)
- JWT Auth
- Swagger (Documentação da API)

---

## 🛠️ Em desenvolvimento

- Registro de consumo de água
- Lembretes e metas diárias
- Histórico de consumo

---

## 📄 Licença

MIT
