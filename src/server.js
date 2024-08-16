import "dotenv/config";
import express from "express";

const PORT = process.env.PORT || 3333;

import conn from "./config/conn.js";

import "./models/palestranteModel.js";
import "./models/participanteModel.js";
import "./models/feedbackModel.js";  
import "./models/eventoModel.js";

import palestranteRouter from "./routes/palestranteRouter.js";
import eventosRouter from "./routes/eventosRouter.js";
import participantesRouter from "./routes/participantesRouter.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/eventos", palestranteRouter, eventosRouter, participantesRouter);

app.get("", (req, res) => {
  res.send("Servidor está funcional e rodando!");
});

app.use((req, res) => {
  res.status(404).json({ msg: "Recurso não encontrado" });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});