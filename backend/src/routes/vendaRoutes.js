import express from "express";
// O segredo está no ".js" no final do caminho abaixo:
import { vendaController } from "../controllers/vendaControllers.js";

const router = express.Router();

router.post("/", vendaController.criar);
router.get("/", vendaController.listar);
router.put("/:id", vendaController.atualizar);
router.delete("/:id", vendaController.excluir);

export default router;