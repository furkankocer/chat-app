const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (message,callback) => {
        io.emit('message', message)
        callback()
    })
    
    socket.emit('message', 'Welcome!')
    socket.broadcast.emit("message", "A user has been join")

    socket.on("disconnect", () =>{
        io.emit("message", "A user has left!")
    })
    socket.on("sendLocation", (coords) => {
        const location = {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
        io.emit("message",location)
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})