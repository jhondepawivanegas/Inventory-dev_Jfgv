import e, { Router } from 'express';
import { funcionesUbicaciones } from '../controllers/ubicaciones.controller.js';

const rutas = Router();

rutas.post("/", funcionesUbicaciones.postUbicacion);
rutas.put("/:id", funcionesUbicaciones.putUbicacion);
rutas.get("/:id", funcionesUbicaciones.getUbicacion);
rutas.get("/", funcionesUbicaciones.getUbicaciones);

export default rutas;