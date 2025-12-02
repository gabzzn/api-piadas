import app from "./app.js";
import express from "express";
import { setupDatabase } from "./config/database.js";
import piadaRoutes from "./routes/piadaRoutes.js"; //importa as rotas de piadas
import cors from "cors";

const PORT = 3000;
app.use(cors());

//middleware para interpretar JSON no corpo das requisições
app.use(express.json());

setupDatabase(); //configura o banco de dados

//usa as rotas de piadas com o prefixo '/api'
app.use("/api", piadaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});