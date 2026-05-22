import process from 'node:process'
import dotenv from 'dotenv'
import { Client } from 'pg'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)

dotenv.config({
    path: path.resolve(dirName, '../../../.env')
})

export const connectionClient = async () => {
    const client = new Client({
        host: process.env.DB_HOST ?? "localhost",
        user: process.env.DB_USER ?? "postgres",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME ?? ER-Store,
        port: Number(process.env.DB_PORT) ?? 5432
    })

    try {
        await client.connect()
        console.log("Conexión con la base de datos exitosa")
    } catch (err) {
        console.error("Error al conectar con la base de datos: ", err)
    }
}
