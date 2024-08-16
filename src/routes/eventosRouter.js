import express from "express";
import {
  registerEventos,
  getEventos
} from "../controllers/eventoController.js";

const router = express.Router();

router.post("/registerEventos", registerEventos);
router.get("/getEventos", getEventos);

export default router;
