import mysql from 'mysql2/promise';
import 'dotenv/config';
export const pool=mysql.createPool({uri:process.env.DATABASE_URL,connectionLimit:10,waitForConnections:true});
export async function query<T=any>(sql:string,params:unknown[]=[]):Promise<T>{const [rows]=await pool.execute(sql,params);return rows as T}
