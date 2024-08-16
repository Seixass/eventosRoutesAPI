import express from "express";
import { registerParticipantes, registerParticipantesEvents } from "../controllers/participanteController.js";

const router = express.Router();

router.post("/registerParticipantes", registerParticipantes);
router.post("/registerParticipantes/registrar", registerParticipantesEvents)

export default router;
