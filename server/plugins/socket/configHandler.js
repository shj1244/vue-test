module.exports = (io, socket) => {
    const update = (data) => {
        console.log('update server configHandler',data);
        io.emit('config:update', data);
    }

    const remove = (data) => {
        console.log('remove server configHandler',data);
        io.emit('config:remove', data);
    }

    socket.on("config:update", update);
    socket.on("config:remove", remove);
}
