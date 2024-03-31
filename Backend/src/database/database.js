import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({path: './src/env/.env'});

export const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

export const connectionDb = async () => {
    try {
        await pool.getConnection();
        console.log("conexión establecida");
    } catch (error) {
        console.error("error en la conexión", error);
    }
};