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

const client = new Client({
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? ER-Store,
    port: Number(process.env.DB_PORT) ?? 5432
})

async function clientConnection() {
    try {
        // Tratar de conectar a la base de datos
        await client.connect()
        console.log('Conexión exitosa a PostgreSQL')

        // Realizar una query de prueba
        const res = await client.query('SELECT NOW()')
        console.log('Fecha y hora actual del servidor: ', res.rows[0].now)
    } catch (err) {
        console.error('Fallo al tratar de conectar a la base de datos: ', err)
    } finally {
        // Cerrar la conexión
        await client.end()
        console.log('Conexión cerrada con éxito')
    }
}

clientConnection()
