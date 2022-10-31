const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Middlewares
app.use(express.static(__dirname + '/public'))

//This is from socket.io library website
io.on('connection', (socket) => {
    console.log("Sokect is connected")
    socket.on('message',(msg) => {
        socket.broadcast.emit('message',msg)
    })
});



//Main path
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
});

//server is listening
server.listen(3000, () => {
    console.log("backend server is running in port 3000")
});