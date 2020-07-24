import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
import socketIo from 'socket.io';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import socketHandler from './socketIo/socketHandler';



const resolvers = {
    Query,
    Mutation,
}

const prisma = new PrismaClient();
const server = new GraphQLServer({
    typeDefs: './dist/schema/schema.graphql',
    resolvers,
    context: (request) => ({
        ...request,
        prisma,
    })
});
server.start(() => console.log('Server is listening on http://localhost:4000')).then(server => {
    const io = socketIo(server);
    io.on('connection', socketHandler(io))
})
