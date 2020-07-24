import redisClient from '../redis/redis';
const sockets:{[key: string]: SocketIO.Socket} = {};
const socketHandler = (io: SocketIO.Server) => (socket: SocketIO.Socket) => {
    if(!sockets.hasOwnProperty(socket.id)) {
        sockets[socket.id] = socket
    }

}

export default socketHandler;