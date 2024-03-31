import { pool } from '../database/database.js';

const postUbicacion = async (peticion, respuesta) => {
    try {
         const ubication = peticion.body;
        const sql = await pool.query("INSERT INTO ubicaciones SET?", ubication);
        respuesta.json({message:"Ubicación Registrada", ubication: sql})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putUbicacion = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const ubication = peticion.body;
        const sql = await pool.query("UPDATE ubicaciones SET ? WHERE id_ubicacion = ?", [ubication, id]);
        respuesta.json({message:"Ubicación Actualizada", ubication: sql})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUbicacion = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const [sql] = await pool.query(`
                                            SELECT ubicaciones.*, 
                                            unidades_productivas.nombre_unidad 
                                            FROM ubicaciones 
                                            JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                                            WHERE id_ubicacion = ?`, id);
        respuesta.json(sql)
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUbicaciones = async (peticion, respuesta) => {
    try {
        const [sql] = await pool.query(`
                                            SELECT ubicaciones.*, 
                                            unidades_productivas.nombre_unidad 
                                            FROM ubicaciones 
                                            JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                                            `);
        respuesta.json(sql)
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};


export const funcionesUbicaciones = {
    postUbicacion,
    putUbicacion,
    getUbicacion,
    getUbicaciones
};