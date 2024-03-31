import { Router } from "express";
import { funcionesUnidades } from "../controllers/uni_productivas.controller.js";

const rutas = Router();

rutas.post("/", funcionesUnidades.postUniProductiva);
rutas.put("/:id", funcionesUnidades.putUniProductiva);
rutas.get("/:id", funcionesUnidades.getUniProductiva);
rutas.get("/", funcionesUnidades.getUnidadesProductivas);

export default rutas;