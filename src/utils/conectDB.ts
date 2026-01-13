import path from "path"
import fs from "fs"
import mysql from "mysql2/promise";


export function readJson<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), "src", "json", fileName)
  console.log(filePath);
  
  const fileContent = fs.readFileSync(filePath, "utf8")
  console.log(fileContent);
  return JSON.parse(fileContent) as T
}

// Configurar la conexión a la base de datos MySQL
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});
