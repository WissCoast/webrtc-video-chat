require('dotenv').config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on('connection', socket => {
    console.log("connection")
    socket.on('disconnect', () => {
        console.log("disconnect")
    });
});

server.listen(process.env.PORT || 8000, () => {
    console.log('server is running on port 8000')
});
