import { pool } from "../database/database.js";

const postEquipo = async (peticion, respuesta) => {
    try {
        const equipo = peticion.body;
        const sql = await pool.query("INSERT INTO equipos SET ?", equipo);
        respuesta.json({message:"Equipo Registrado", equipment: sql})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putEquipo = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const equipo = peticion.body;
        const sql = await pool.query("UPDATE equipos SET ? WHERE id_equipo = ?", [equipo, id]);
        respuesta.json({message:"Equipo Actualizado", equipment: sql})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getEquipo = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const [sql] = await pool.query(`
                                            SELECT equipos.*,
                                            categorias.nombre_categoria,
                                            ubicaciones.ambiente,
                                            ubicaciones.sitio,
                                            unidades_productivas.nombre_unidad
                                            FROM equipos
                                            JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                                            JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                                            JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                                            WHERE id_equipo = ?`, id);
        respuesta.json(sql);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getEquipos = async (peticion, respuesta) => {
    try {
        const [sql] = await pool.query(`
                                            SELECT equipos.*,
                                            categorias.nombre_categoria,
                                            ubicaciones.ambiente,
                                            ubicaciones.sitio,
                                            unidades_productivas.nombre_unidad
                                            FROM equipos
                                            JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                                            JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                                            JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                                            `);
        respuesta.json(sql);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};


export const funcionesEquipos = {
    postEquipo,
    putEquipo,
    getEquipo,
    getEquipos
};