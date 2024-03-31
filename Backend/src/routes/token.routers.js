import { Router } from "express";
import { validarUsuario } from "../controllers/token.controller.js";

const router = Router();

router.post('/validar', validarUsuario);

export default router;