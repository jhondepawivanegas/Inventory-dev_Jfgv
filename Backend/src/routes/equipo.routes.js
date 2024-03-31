import { Router } from "express";
import { funcionesEquipos } from "../controllers/equipo.controller.js";

const rutas = Router();

rutas.post("/", funcionesEquipos.postEquipo);
rutas.put("/:id", funcionesEquipos.putEquipo);
rutas.get("/:id", funcionesEquipos.getEquipo);
rutas.get("/", funcionesEquipos.getEquipos);


export default rutas;