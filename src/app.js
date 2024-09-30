import express from "express";
import bodyParser from "body-parser";
import registerRoutes from "./routes/register.route.js";
import loginRoutes from "./routes/login.route.js";
import restauranteRoutes from "./routes/restaurante.route.js";
import profileRoutes from "./routes/profile.route.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API - Go Appa");
});

app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/restaurante", restauranteRoutes);
app.use("/api/profile", profileRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
