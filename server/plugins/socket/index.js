const  { Server } = require("socket.io");
const configHandler = require('./configHandler');

module.exports = function(webServer) {
    const io = new Server(webServer);
    
    io.on("connection", (socket) => {
        configHandler(io, socket);

        console.log('a user connected ' + socket.id);

        socket.on("disconnect", () => {
            console.log('disconnect ');
        });

        socket.on('room:join', (roomName) => {
            console.log('room:join===>',roomName);
            socket.join(roomName);
        });

        socket.on('room:leave', (roomName) => {
            console.log('room:leave===>',roomName);
            socket.leave(roomName);
        });

        socket.on('room:send', (data) => {
            console.log('room:send===>',data);
            const msg = data.msg + " 서버 응답"
            //io.emit('room:send',{msg}); // 모든 사용자
            //socket.broadcast.emit('room:msg', {msg}); // 나를 제외한 모든 사용자
            //io.to('roomtest').emit('room:send',{msg}); // 룸에 있는 모든 사용자
            socket.to('roomtest').emit('room:msg', {msg}); // 룸에 있는 나를 제외한 모든 사용자
        });

        // socket.on('config:update', (data) => {
        //     console.log('index.js server===>',data);
        //     //io.emit('config:update', {rescive: '응답'})
        //     socket.broadcast.emit('config:update', {rescive: '브로드캐스트'})
        // })
    });
}