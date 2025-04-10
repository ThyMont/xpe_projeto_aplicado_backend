import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import metaRoutes from "./routes/metaRoutes";
import { setupSwagger } from "./config/swagger";
import consumoRoutes from "./routes/consumoRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import recipienteRoutes from "./routes/recipientesRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Hydrapp backend está rodando!");
});

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/consumo", consumoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/recipientes", recipienteRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
