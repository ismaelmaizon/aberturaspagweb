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


// ✅ Test al iniciar el servidor
async function testDbConnection() {
  try {
    const connection = await db.getConnection();
    await connection.query("SELECT 1");
    connection.release();
    console.log(`✅ Conectado correctamente a la BD "${process.env.DB_NAME}"`);
  } catch (error) {
    console.error("❌ ERROR al conectar a la base de datos:", error);
  }
}

// se ejecuta una sola vez, cuando el archivo se importa en el servidor
testDbConnection();