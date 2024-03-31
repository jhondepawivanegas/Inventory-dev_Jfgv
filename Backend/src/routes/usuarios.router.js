import { Router } from "express";
import { actualizarUsuario, buscarUsuario, listarUsuarios, registrarUsuario } from "../controllers/usuarios.controller.js";
//import { validarToken } from "../controllers/token.controller.js";

const router = Router();

router.get('/listar', /* validarToken,  */listarUsuarios);
router.get('/buscar/:id', buscarUsuario);
router.post('/registrar', registrarUsuario);
router.put('/actualizar/:id', actualizarUsuario);

export default router;