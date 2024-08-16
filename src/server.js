import "dotenv/config";
import express from "express";

const PORT = process.env.PORT || 3333;

import conn from "./config/conn.js";

import "../src/models/eventoModel.js";
import "../src/models/PalestranteModel.js";
import "../src/models/ParticipanteModel.js";

import palestranteRouter from "../src/routes/palestranteRouter.js";
import eventosRouter from "../src/routes/eventosRouter.js";
import participanteRouter from "../src/routes/participantesRouter.js"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/eventos", palestranteRouter, eventosRouter, participanteRouter);

app.get("", (req, res) => {
  res.send("Servidor está funcional e rodando!");
});

app.use((req, res) => {
  res.status(404).json({ msg: "Recurso não encontrado" });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
