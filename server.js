const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const http = require('http')


const app = express()
const server = http.createServer(app)
const io = socket(server, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

function getAllChats(sender, receiver) {
    return ['hello-world']
}

app.use(cors())

app.get('/all-chats', (req, res) => {
    const sender = req.query['sender'];
    const receiver = req.query['receiver'];
    res.json({ 'chats': getAllChats(sender, receiver) })
})


io.on('connection', (socket) => {
    io.allSockets().then(sockets => {
        io.emit('contact-list', [...sockets])
        socket.on('msg-send', (msg, id) => {
            console.log(`${msg} was sent to ${id}`);
            socket.to(id).emit('msg-receive', msg, socket.id)
        })
        socket.on('chat-leave', (id) =>{
            console.log(`a socket with id ${id} just left the ckat`);
        })
    })

});


app.use(cors({ origin: 'http://localhost:3000' }))

const port = process.env["PORT"] || 3001

server.listen(port, () => {
    console.log("the server is running");
})