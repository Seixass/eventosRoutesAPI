import express from "express";
import {
  registerPalestrante,
  getPalestrantes,
} from "../controllers/palestranteController.js";

const router = express.Router();

router.post("/registerPalestrantes", registerPalestrante);
router.get("/getPalestrantes", getPalestrantes);

export default router;
