import express from 'express'
import cors from 'cors'
import MusicsController from "./app/controllers/musicsController.js"
const app = express()
const port = 3000

app.use(cors('*'))
app.get('/musics', MusicsController.index)
app.get('/musics/stream/:id', MusicsController.stream)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
