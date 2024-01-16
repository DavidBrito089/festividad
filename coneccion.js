const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const messages = [];

app.use(express.static('public'));

let userCount = 0;

io.on('connection', (socket) => {

    userCount++;
    io.emit('update user count', userCount);

    socket.on('join', (data) => {
        io.emit('user joined', { username: data.username, userColor: data.userColor });
    });

    socket.on('chat message', (data) => {
        io.emit('chat message', { username: data.username, message: data.message, userColor: data.userColor });
    });

    socket.on('disconnect', () => {
        userCount--;

        io.emit('update user count', userCount);
        io.emit('user left', { username: 'Usuario desconectado', userColor: 'red' });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
