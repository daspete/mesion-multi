export default (io) => {
    console.log('Socket.IO initialized')
    
    io.on('connection', (socket) => {
        console.log('socket connected ', socket.id)
        socket.emit('socket.data', { hello: 'socket' })
    })
}