import { pool } from "../database/database.js";
import jwt from "jsonwebtoken";

export const validarUsuario = async(req,res)=>{
    try {
        const {nombres} = req.body
        let sql = `SELECT identificacion FROM usuarios WHERE nombres='${nombres}'`;
        let [rows] = await pool.query(sql);

        if(rows.length>0){
            let[rows] = await pool.query(sql);
            let token = jwt.sign({user:rows},process.env.SECRET,{expiresIn:process.env.TIME});
            return res.status(200).json({"message":"Usuario autorizado","token":token});
        }else{
            return res.status(404).json({"message":"Usuario no autorizado"});  
        }
        
    } catch (error) {
        return res.status(500).json({"message sasa":error.message});
        //console.log(error.message)
    }
}

export const validarToken = async(req,res,next)=>{
    try {
        let token_cliente = req.headers['token'];
        if(!token_cliente){
            return res.status(402).json({"message":"El token es requerido"});
        }else{
            let decode = jwt.verify(token_cliente,process.env.SECRET,(error,decoded)=>{
                if(error) return res.status(402).json({"message":"El token es invalido"});
                else next();
            });
        }
        
    } catch (error) {
        return res.status(500).json({"message":error.message});
    }
}