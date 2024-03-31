import { Router } from "express";
import { funcionesCategorias } from "../controllers/categoria.controller.js";

const rutas = Router();

rutas.post("/", funcionesCategorias.postCategoria);
rutas.put("/:id", funcionesCategorias.putCategoria);
rutas.get("/:id", funcionesCategorias.getCategoria);
rutas.get("/", funcionesCategorias.getCategorias);

export default rutas;