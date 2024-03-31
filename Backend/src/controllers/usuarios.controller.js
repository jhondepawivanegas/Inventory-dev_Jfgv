import { pool } from "../database/database.js";

export const listarUsuarios = async(req,res) =>{
    try {
        const query = 
        'SELECT u.id_usuario, u.identificacion, u.nombres, u.apellidos, u.email, u.telefono, tp.rol, up.nombre_unidad FROM usuarios u                     JOIN tipo_usuario tp ON u.fk_tipo_usuario = tp.id_tipo_usuario                                                                      JOIN unidades_productivas up ON up.id_unidad = u.fk_unidad_productiva';
        
        const [rows] = await pool.query(query)

        if(rows.length>0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({meesage:"No hay usuarios registrados!"})
        }

    } catch (error) {
        console.log(error.message)
    }
}

export const buscarUsuario = async(req,res) =>{
    try {
        const id = req.params.id
        const query = 'SELECT * FROM usuarios WHERE id_usuario = ?'
        const [rows] = await pool.query(query,[id])

        if(rows.length>0){
            res.status(200).json(rows)
        }else{
            res.status(401).json({meesage:"El usuario no existe!"})
        }

    } catch (error) {
        console.log(error.message)
    }
}

export const registrarUsuario = async (req, res) => {
    try {
        const { identificacion, nombres, apellidos, email, telefono, password, fk_tipo_usuario, fk_unidad_productiva } = req.body;

        // Verificar si el usuario ya está registrado con el mismo email
        const verificarQuery = `SELECT * FROM usuarios WHERE email = ?`;
        const [verificarRows] = await pool.query(verificarQuery, [email]);

        if (verificarRows.length > 0) {
            // Usuario ya registrado, enviar mensaje de error
            return res.status(409).json({ message: "Usuario ya registrado con este email." });
        }

        // Si el usuario no está registrado, proceder con la inserción
        const insertQuery = `INSERT INTO usuarios (identificacion, nombres, apellidos, email, telefono, password, fk_tipo_usuario, fk_unidad_productiva) VALUES (?,?,?,?,?,?,?,?)`;
        const [rows] = await pool.query(insertQuery, [identificacion, nombres, apellidos, email, telefono, password, fk_tipo_usuario, fk_unidad_productiva]);

        if (rows.affectedRows > 0) {
            res.status(200).json({ message: "Usuario registrado!" });
        } else {
            res.status(401).json({ message: "Usuario no registrado!" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const actualizarUsuario = async(req,res) =>{
    try {
        const id = req.params.id
        const {identificacion,nombres,apellidos,email,telefono,password} = req.body
        const query = `UPDATE usuarios SET identificacion='${identificacion}', nombres='${nombres}', apellidos='${apellidos}', email='${email}', telefono='${telefono}', password='${password}'  WHERE id_usuario=${id}`
        const [rows] = await pool.query(query)

        if(rows.affectedRows>0){
            res.status(200).json({meesage:"Usuario actualizado!"})
        }else{
            res.status(401).json({meesage:"Usuario no actualizado!"})
        }

    } catch (error) {
        console.log(error.message)
    }
}