import socketio from 'socket.io'

export default ({ server, sockets }) => {
    const io = socketio(server)

    sockets(io)

    return io
}