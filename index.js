const express = require("express")
const app = express()
const cors = require("cors")
const fs = require("fs")

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000
const url = "htpp://localhost:3000"
const clientURL = "/canciones"
const archive = "repertorio.json"

app.listen(port, () => {
    console.log(`Inicializado escuchando el puerto: ${port} en ${url}`)
})

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get(clientURL, (req, res) => {
    const songList = JSON.parse(fs.readFileSync(archive, "utf8")) 

    return res.send(songList)
})

app.post(clientURL, (req, res) => {
    const newSong = req.body

    const songs = JSON.parse(fs.readFileSync(archive, "utf8"))

    songs.push(newSong)

    fs.writeFileSync(archive, JSON.stringify(songs, null, 2))
    
    return res.sendStatus(200)
})

app.put(`/canciones/:id`, (req, res) => {
    const { id } = req.params

    const song = req.body

    const songs = JSON.parse(fs.readFileSync(archive, "utf8"))

    const index = songs.findIndex(s => s.id == id)
    songs[index] = song

    fs.writeFileSync(archive, JSON.stringify(songs))

    return res.sendStatus(200)
})

app.delete(`/canciones/:id`, (req, res) => {
    const { id } = req.params

    const songs = JSON.parse(fs.readFileSync(archive, "utf8"))

    const index = songs.findIndex(s => s.id == id)
    songs.splice(index, 1)

    fs.writeFileSync(archive, JSON.stringify(songs))

    return res.sendStatus(200)
})

