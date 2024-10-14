import express from "express";
import { swaggerUi, swaggerDocs } from "../swagger.js";
import bodyParser from "body-parser";
import registerRoutes from "./routes/register.route.js";
import loginRoutes from "./routes/login.route.js";
import restauranteRoutes from "./routes/restaurante.route.js";
import profileRoutes from "./routes/profile.route.js";
import cardapioRoutes from "./routes/cardapio.route.js";
import categoriaCardapioRoutes from "./routes/categoriaCardapio.route.js";
import itemCardapioRoutes from "./routes/itemCardapio.route.js";
import pedidoRouter from "./routes/pedido.route.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "API - Go Appa" });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/register", registerRoutes);
app.use("/auth", loginRoutes);
app.use("/restaurante", restauranteRoutes);
app.use("/profile", profileRoutes);
app.use("/cardapio", cardapioRoutes);
app.use("/categoria", categoriaCardapioRoutes);
app.use("/itemCardapio", itemCardapioRoutes);
app.use("/pedidos", pedidoRouter);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
