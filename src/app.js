import express from "express";
const app = express();
const port = 3000;

// Rota simples para o endpoint principal
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
