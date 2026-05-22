import Router from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).send('Lista de usuarios')
})

router.post('/', (req, res) => {
    res.status(201).send('Información almacenada con éxito')
})
