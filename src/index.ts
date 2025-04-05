import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Hydrapp backend está rodando!");
});

// Rotas
app.use("/auth", authRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
