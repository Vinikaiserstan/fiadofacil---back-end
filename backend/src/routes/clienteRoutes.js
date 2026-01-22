import express from "express";
import { clienteController } from "../controllers/clienteController.js";

const router = express.Router();

router.post("/", clienteController.criar);
router.get("/", clienteController.listar);

export default router;