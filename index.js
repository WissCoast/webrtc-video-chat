require('dotenv').config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const [rooms, roomMap] = [{}, {}];

io.on('connection', socket => {
    console.log("connection")
    socket.on("enter", res => {
        const id = res.groupId
        const username = res.username
        rooms[id] ? rooms[id].push({id: socket.id, username: username}) : rooms[id] = [{id: socket.id, username: username}];
        roomMap[socket.id] = id;
        const otherParticipantsInRoom = rooms[id].filter(room => room.id !== socket.id);
        socket.emit("participants", otherParticipantsInRoom);
    });

    socket.on("forward signal", res => {
        console.log("forward signal")
        io.to(res.otherUser)
            .emit('new user', {
                signal: res.signal, 
                newUserId: res.newUserId,
                username: res.username,
            });
    });

    socket.on("reply", res => {
        console.log("reply")
        io.to(res.newUserId)
            .emit('reply back', { 
                signal: res.signal,
                 id: socket.id 
            });
    });

    socket.on('disconnect', () => {
        console.log("disconnect")
        let room = rooms[roomMap[socket.id]];
        room && (rooms[roomMap[socket.id]] = room.filter(room => room.id !== socket.id));
    });
});

server.listen(process.env.PORT || 8000, () => {
    console.log('server is running on port 8000')
});
